import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/entity/orders.entity';
import { OrderItem } from './orders/entity/order-items.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'MS%T&X9bVk',
      database: 'cosmos',
      entities: [Order, OrderItem],
      synchronize: true, //only for dev
    }),
    OrdersModule,
  ],
})
export class AppModule {}
