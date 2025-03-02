import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { updateOrderStatusDto } from './dto/order-update.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  // Create Order Endpoint
  @Post("/")
  @UsePipes(ValidationPipe)
  async createOrder(@Body() createOrder: CreateOrderDto) {
    return await this.orderService.create(createOrder);
  }

  // Get all orders
  @Get('all')
  async fetchAll() {
    return await this.orderService.fetchAll();
  }

  // Get order by id
  @Get(':id')
  async fetch(@Param('id') id: string) {
    return await this.orderService.fetch(id);
  }

  // Update Order status
  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() updateOrderStatus: updateOrderStatusDto,
  ) {
    return await this.orderService.updateOrderStatus(id, updateOrderStatus);
  }
}
