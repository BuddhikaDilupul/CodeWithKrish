import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { createOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Kafka } from 'kafkajs';
import { Redis } from 'ioredis';

@Injectable()
export class OrdersService implements OnModuleInit {
  private readonly Kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
  private readonly redis = new Redis({ host: '3.0.159.213', port: 6379 });
  private readonly producer = this.Kafka.producer();
  private readonly consumer = this.Kafka.consumer({
    groupId: 'buddhika-order-service',
  });
  private readonly inventoryServiceUrl = 'http://localhost:3001/products';
  private readonly customerServiceUrl = 'http://localhost:3002/customers';

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly httpService: HttpService,
  ) {}
  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumerConfirmedOrder();
  }

  async create(createOrderDto: createOrderDto): Promise<any> {
    const { customerId, items, city } = createOrderDto;

    // Validate customer exists
    let customerName = '';
    try {
      const response$ = this.httpService.get(
        `${this.customerServiceUrl}/${customerId}`,
      );
      const response = await lastValueFrom(response$);
      customerName = response.data.name;
    } catch (error) {
      throw new BadRequestException(
        `Customer ID ${customerId} does not exist.`,
      );
    }

    // aquire lock
    for (const item of items) {
      const lockKey = `buddhika:product:${item.productId}`;
      console.log(lockKey);

      const lock = await this.redis.set(
        lockKey,
        'locked',
        'EX',
        3600 * 24,
        'NX',
      );
      if (!lock) {
        throw new BadRequestException(
          `Product ${item.productId} is been locked by another process. Plase try agaim leter`,
        );
      }
    }
    // produce odrer as an event

    this.producer.send({
      topic: 'buddhika.order.create',
      messages: [
        {
          value: JSON.stringify({ customerId, customerName, items, city }),
        },
      ],
    });

    return { message: 'Order is placed. waiting invemtory service to process' };
  }

  async fetch(id: any) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async fetchAll() {
    return await this.orderRepository.find({ relations: ['items'] });
  }

  async updateOrderStaus(id: number, updateStatus: UpdateOrderStatus) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`order with id: ${id} is not found`);
    }
    if (
      order.status === OrderStatus.DELIVERED ||
      order.status === OrderStatus.CANCELLED
    ) {
      throw new BadRequestException(
        `order status cannot be changed when its delivered or cancelled`,
      );
    }
    order.status = updateStatus.status;
    return await this.orderRepository.save(order);
  }

  // Save order to db
  async saveOrder(createOrderDto: createOrderDto, customerName: string) {
    try {
      const { customerId, items, city } = createOrderDto;
      const order = this.orderRepository.create({
        customerId,
        city,
        status: 'PENDING',
      });
      const savedOrder = await this.orderRepository.save(order);
      
      const orderItems = items.map((item) =>
        this.orderItemRepository.create({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
          order: savedOrder,
        }),
      );
      const savedOrderItems = await this.orderItemRepository.save(orderItems);
      await this.producer.send({
        topic: 'buddhika.order.confirmed',
        messages: [
          {
            value: JSON.stringify({
              message: `${customerName}'s Order is placed and confirmed succcessfully. Order Id is ${savedOrder.id}`,
            }),
          },
        ],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async consumerConfirmedOrder() {
    await this.consumer.subscribe({
      topic: 'buddhika.order.inventory.update',
    });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const { customerId, customerName, city, items } = JSON.parse(
          message.value.toString(),
        );
        await this.saveOrder({ customerId, city, items }, customerName);
      },
    });
  }
}
