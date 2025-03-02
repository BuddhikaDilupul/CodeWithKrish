import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { Customer } from 'src/customer/entity/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // Customer create logic
  async create(customer: CreateCustomerDto): Promise<Customer | null> {
    const { name, address, email } = customer;
    const customerDraft = this.customerRepository.create({
      name,
      address,
      email,
    });

    // Check email is available or not
    const isExist = await this.customerRepository.findOne({ where: { email } });
    if (!isExist) {
      return await this.customerRepository.save(customerDraft);
    } else {
      throw new BadRequestException(['This email is already used!']);
    }
  }

  // Fetch customer by their Id
  async get(id: number): Promise<Customer | null> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    
    // Check customer is exist or not
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  // Fetch all customers
  async getAll(): Promise<Customer[] | null> {
    return await this.customerRepository.find();
  }
}
