import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from 'src/dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  // Create Customer 
  async create(@Body() customer: CreateCustomerDto): Promise<any> {
    return await this.customerService.create(customer);
  }

  @Get('/all')
  // Get all customers
  async getAll() {
    return await this.customerService.getAll();
  }

  @Get(':id')
  // Get customer by Id
  async get(@Param('id') id: number) {
    return this.customerService.get(id);
  }
}
