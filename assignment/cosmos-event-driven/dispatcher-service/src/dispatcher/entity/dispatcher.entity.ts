import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  
  @Entity()
  export class VehicleDispatcher {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    vehicle_number: string;
    @Column()
    city: string;
  }
  