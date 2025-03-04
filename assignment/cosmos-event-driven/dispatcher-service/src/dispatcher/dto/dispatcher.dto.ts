import { IsInt, IsNotEmpty } from 'class-validator';

export class DispatcherDto {
  @IsNotEmpty()
  vehicle_number: string;
  @IsNotEmpty()
  city: string;
}

export class CheckCity{
    @IsNotEmpty()
    city: string;
}