import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/entity/customer.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'MS%T&X9bVk',
    database: 'prod-cosmos',
    entities: [Customer],
    synchronize: false
  }),
   CustomerModule],
})
export class AppModule {}
