import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/orders.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-items.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, updateOrderStatusDto } from './dto/order-update.dto';

@Injectable()
export class OrdersService {
  constructor(

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    
  ) {}

  async create(createOrder: CreateOrderDto): Promise<Order | null> {
    const { customerId, items } = createOrder;
    const order = this.orderRepository.create({
      customerId,
      status: 'PENDING',
    });
    const savedOrder = await this.orderRepository.save(order);

    const orderItems = items.map((item) => {
      return this.orderItemRepository.create({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        order: savedOrder,
      });
    });
    await this.orderItemRepository.save(orderItems);
    return this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['items'],
    });
  }

  async fetch(id: any): Promise<Order | null> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async fetchAll(): Promise<Order[] | null> {
    return await this.orderRepository.find({
      relations: ['items'],
    });
  }

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
