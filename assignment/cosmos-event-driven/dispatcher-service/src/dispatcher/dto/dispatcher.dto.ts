import { IsInt, IsNotEmpty } from 'class-validator';

export class DispatcherDto {
  @IsNotEmpty()
  vehicleNo: string;
  @IsNotEmpty()
  city: string;
}

export class CheckCity{
    @IsNotEmpty()
    city: string;
}