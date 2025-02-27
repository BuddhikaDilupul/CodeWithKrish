import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/orders.entity';
import { OrderItem } from './entity/order-items.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
