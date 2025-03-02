import { IsNumber, IsString } from "class-validator";

export class InentoryCreateDto{
    @IsString()
    name: string;
    @IsNumber()
    quantity: number;
    @IsNumber()
    price: number;

}