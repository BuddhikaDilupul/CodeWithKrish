import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { Redis } from 'ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleDispatcher } from './entity/dispatcher.entity';
import { Repository } from 'typeorm';
import { DispatcherDto } from './dto/dispatcher.dto';

@Injectable()
export class DispatcherService implements OnModuleInit {
  private readonly Kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
  private readonly redis = new Redis({ host: '3.0.159.213', port: 6379 });
  private readonly producer = this.Kafka.producer();
  private readonly consumer = this.Kafka.consumer({
    groupId: 'buddhika-dispatcher-service',
  });

  // constructor
  constructor(
    @InjectRepository(VehicleDispatcher)
    private readonly dispatcherRepository: Repository<VehicleDispatcher>,
  ) {}
  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumerConfirmedOrder();
  }

  // Check avaialability of vehicles
  async checkAvailabeVehileForCity(city: string): Promise<any> {
    const vehicles = await this.dispatcherRepository.find({
      where: { city },
    });
    if (!vehicles) {
      throw new BadRequestException('No vehicles available for this city');
    }
    // aquire lock
    for (const item of vehicles) {
      const lockKey = `buddhika:dispatcher:${item.vehicle_number}`;
      console.log(lockKey);

      const lock = await this.redis.set(
        lockKey,
        'locked',
        'EX',
        3600 * 24,
        'NX',
      );
      if (!lock) {
        console.log(
          `Vehicle ${item.vehicle_number} is been locked by another process. Plase try again leter`,
        );
      } else {
        console.log(`Vehicle ${item.vehicle_number} is available`);
        break;
      }
    }
  }

  // release vehicle
  async releaseVehicle(vehicle_number: string): Promise<any> {
    const lockKey = `buddhika:dispatcher:${vehicle_number}`;
    
    const release = await this.redis.del(lockKey);
    if (release) {
      console.log(`Vehicle ${vehicle_number} is released`);
      return { message: 'Vehicle is released' };
    } else {
      throw new BadRequestException(`Vehicle ${vehicle_number} is not available`);
    }
  }

  // save city
  async dispatcherInfo(
    dispatcherDto: DispatcherDto,
  ): Promise<VehicleDispatcher> {
    const { city, vehicle_number } = dispatcherDto;
    const dispatcher = this.dispatcherRepository.create({
      city,
      vehicle_number,
    });
    return this.dispatcherRepository.save(dispatcher);
  }

  async consumerConfirmedOrder() {
    await this.consumer.subscribe({
      topic: 'buddhika.order.inventory.update',
    });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const { customerName, city } = JSON.parse(message.value.toString());
        await this.checkAvailabeVehileForCity(city);
      },
    });
  }
}
