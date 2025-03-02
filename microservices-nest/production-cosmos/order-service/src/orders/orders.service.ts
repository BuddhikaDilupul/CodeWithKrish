import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/orders.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-items.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, updateOrderStatusDto } from './dto/order-update.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { OrderResponseDto } from './dto/view-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

    private httpService: HttpService,
  ) {}

  // Create Order function
  async create(createOrder: CreateOrderDto): Promise<Order | null> {
    const { customerId, items } = createOrder;

    // Check if customer exists
    try {
      await firstValueFrom(
        this.httpService.get(`http://localhost:3000/customer/${customerId}`),
      );
    } catch {
      throw new BadRequestException('Customer not found');
    }

    // Validate stocks
    for (const item of items) {
      try {
        const response = await firstValueFrom(
          this.httpService.get(
            `http://localhost:3001/inventory/products/${item.productId}/validate?quantity=${item.quantity}`,
          ),
        );

        if (!response.data['available']) {
          throw new BadRequestException('Low stocks');
        }
      } catch {
        throw new BadRequestException('Item not found or Low stocks');
      }
    }

    const order = this.orderRepository.create({
      customerId,
      status: 'PENDING',
    });

    // Save Orders in order table
    const savedOrder = await this.orderRepository.save(order);

    const orderItems = items.map((item) =>
      this.orderItemRepository.create({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        order: savedOrder,
      }),
    );

    // Save data in item table
    await this.orderItemRepository.save(orderItems);

    // Return order data with all items
    const orderDetails = await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['items'],
    });
    if (!orderDetails) {
      throw new NotFoundException('Order not found');
    }

    // Stock update
    try {
      for (const data of orderItems) {
        await firstValueFrom(
          this.httpService.patch(
            `http://localhost:3001/inventory/products/${data.productId}/quantity`,
            {
              quantity: data.quantity,
            },
          ),
        );
      }
    } catch (error) {
      throw new InternalServerErrorException('Error updating stock');
    }
    return orderDetails;
  }

  // Fetch order by Id
  async fetch(id: any): Promise<Order | null> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  // Fetch all orders
  async fetchAll(): Promise<OrderResponseDto[] | null> {
    const orders = await this.orderRepository.find({
      relations: ['items'],
    });

    if (!orders) {
      throw new NotFoundException('No Order found');
    }
    // Simultaniously fetching data
    const [responseCustomer, responseInventory] = await Promise.all([
      firstValueFrom(
        this.httpService.get(`http://localhost:3000/customer/all`, {
          headers: {
            Authorization: `Bearer ${process.env.THIRD_PARTY_API_TOKEN}`,
          },
        }),
      ),
      firstValueFrom(
        this.httpService.get(`http://localhost:3001/inventory/all`, {
          headers: {
            Authorization: `Bearer ${process.env.THIRD_PARTY_API_TOKEN}`,
          },
        }),
      ),
    ]);

    // Set in to map
    const customerMap = new Map(
      responseCustomer.data.map((customer: any) => [
        customer.id.toString(),
        customer.name,
      ]),
    );
    // set in to map
    const inventoryMap = new Map(
      responseInventory.data.map((item: any) => [
        item.id.toString(),
        item.name,
      ]),
    );

    const transformData: OrderResponseDto[] = orders.map((order: any) => ({
      orderId: order.id,
      customerName:
        (customerMap.get(order.customerId.toString()) as string) || 'Unknown',
      orderCreatedAt: order.createdAt,
      status: order.status,
      items: order.items.map((item: any) => ({
        id: item.id,
        productName:
          (inventoryMap.get(item.productId.toString()) as string) || 'Unknown',
        quantity: item.quantity,
        price: item.price,
      })),
    }));

    return transformData;
  }

  // Update Order status
  async updateOrderStatus(
    id: number,
    updateOrderStatusDto: updateOrderStatusDto,
  ): Promise<Order | null> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    if (
      order.status == OrderStatus.DELIVERED ||
      order.status == OrderStatus.CANCELED
    )
      throw new BadRequestException(
        'This order is already Delivered or Cancelled',
      );
    order.status = updateOrderStatusDto.status;
    return await this.orderRepository.save(order);
  }
}
