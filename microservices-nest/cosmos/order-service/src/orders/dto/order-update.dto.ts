import { IsEnum } from "class-validator";

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export class updateOrderStatusDto{
  @IsEnum(OrderStatus)
  status: OrderStatus;
}