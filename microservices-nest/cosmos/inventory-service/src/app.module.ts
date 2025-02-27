import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from './inventory/inventory.module';
import { Inventory } from './inventory/entity/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'MS%T&X9bVk',
      database: 'cosmos',
      entities: [Inventory],
      synchronize: true, //only for dev
    }),
    InventoryModule,
  ],
})
export class AppModule {}
