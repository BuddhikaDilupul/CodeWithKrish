import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class InentoryCreateDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
    
    @IsNumber()
    @IsNotEmpty()
    price: number;

}