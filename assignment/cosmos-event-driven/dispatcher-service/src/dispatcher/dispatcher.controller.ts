import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DispatcherService } from './dispatcher.service';
import { CheckCity, DispatcherDto } from './dto/dispatcher.dto';
import { VehicleDispatcher } from './entity/dispatcher.entity';

@Controller('dispatcher')
export class DispatcherController {
  constructor(private readonly dispatcherService: DispatcherService) {}

  // API to save dispatcher info
  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() dispatcherDto: DispatcherDto,
  ): Promise<VehicleDispatcher> {
    return await this.dispatcherService.dispatcherInfo(dispatcherDto);
  }

  // Api to rmove lock
  @Patch('dispatch-locations/:vehicle_name/release')
  async removeLock(
    @Param('vehicle_name') vehicle_name: string,
  ): Promise<VehicleDispatcher> {
    return await this.dispatcherService.releaseVehicle(vehicle_name);
  }
}
