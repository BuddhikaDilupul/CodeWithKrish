import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entity/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'MS%T&X9bVk',
      database: 'cosmos',
      entities: [Customer],
      synchronize: true, //only for dev
    }),
    CustomerModule,
  ],
})
export class AppModule {}
