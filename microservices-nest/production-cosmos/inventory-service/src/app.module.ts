import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './inventory/entity/inventory.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'MS%T&X9bVk',
        database: 'prod-cosmos',
        entities: [Inventory],
        synchronize: false, //only for dev
      }),
      InventoryModule],
})
export class AppModule {}
