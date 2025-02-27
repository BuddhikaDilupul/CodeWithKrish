import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { updateOrderStatusDto } from './dto/order-update.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Post()
  async createOrder(@Body() createOrder: CreateOrderDto) {
    return await this.orderService.create(createOrder);
  }

  @Get('all')
  async fetchAll() {
    return await this.orderService.fetchAll();
  }

  @Get(':id')
  async fetch(@Param('id') id: string) {
    return await this.orderService.fetch(id);
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() updateOrderStatus: updateOrderStatusDto,
  ) {
    return await this.orderService.updateOrderStatus(id, updateOrderStatus);
  }
}
