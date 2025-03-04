import { Module } from '@nestjs/common';
import { DispatcherService } from './dispatcher/dispatcher.service';
import { DispatcherController } from './dispatcher/dispatcher.controller';
import { DispatcherModule } from './dispatcher/dispatcher.module';
import { VehicleDispatcher } from './dispatcher/entity/dispatcher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DispatcherModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOSTNAME || 'localhost',
      port: 3306,
      username: 'root',
      password: 'MS%T&X9bVk',
      database: 'cosmos',
      entities: [VehicleDispatcher],
      synchronize: true, //only on dev
    }),
  ],
})
export class AppModule {}
