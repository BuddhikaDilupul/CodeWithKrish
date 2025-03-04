import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleDispatcher } from './entity/dispatcher.entity';
import { DispatcherService } from './dispatcher.service';
import { DispatcherController } from './dispatcher.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleDispatcher])],
  providers: [DispatcherService],
  controllers: [DispatcherController],
})
export class DispatcherModule {}
