export class OrderResponseDto {
    orderId: string;
    customerName: string;
    orderCreatedAt: Date;
    status: string;
    items: any[]; 
  }