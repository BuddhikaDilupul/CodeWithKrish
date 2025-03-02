import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inventory{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    quantity: number;
    @Column('decimal')
    price: number;
}