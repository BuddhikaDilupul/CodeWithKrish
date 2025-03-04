import { Type } from 'class-transformer';
import { IsArray, IsInt, isInt, IsNotEmpty, ValidateNested } from 'class-validator';

class OrderItemDto {
  @IsInt()
  @IsNotEmpty()
  productId: number;
  @IsNotEmpty()
  price: number;
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}

export class createOrderDto {
  @IsInt()
  customerId: number;

  //Added city
  @IsNotEmpty()
  city: string;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
