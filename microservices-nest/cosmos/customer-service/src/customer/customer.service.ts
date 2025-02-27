import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './entity/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(customer: CreateCustomerDto): Promise<Customer | null> {
    const { name, address, email } = customer;
    const customerDraft = this.customerRepository.create({
      name,
      address,
      email,
    });
    if (name == '' || name == null) {
      throw new BadRequestException('Name is required');
    }
    const isExist = await this.customerRepository.findOne({ where: { email } });
    if (!isExist) {
      return await this.customerRepository.save(customerDraft);
    } else {
      throw new BadRequestException(
        'Can not use this email, becasue this is exists',
      );
    }
  }

  async get(id: number): Promise<Customer | null> {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async getAll(): Promise<Customer[] | null> {
    return await this.customerRepository.find();
  }
}
