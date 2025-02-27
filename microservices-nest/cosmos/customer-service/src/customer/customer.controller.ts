import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/')
  async create(@Body() customer: CreateCustomerDto): Promise<any> {
    return await this.customerService.create(customer);
  }

  @Get('/all')
  async getAll() {
    return await this.customerService.getAll();
  }
  
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.customerService.get(id);
  }

}
