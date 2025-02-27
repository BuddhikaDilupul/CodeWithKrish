import { Column, PrimaryGeneratedColumn, Unique } from "typeorm";

export class Customer{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    address: string;
}