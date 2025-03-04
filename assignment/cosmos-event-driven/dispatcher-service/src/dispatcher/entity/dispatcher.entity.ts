import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  
  @Entity()
  export class VehicleDispatcher {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    vehicleNo: string;
    @Column()
    city: string;
  }
  