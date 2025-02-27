import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entity/inventory.entity';
import { Repository } from 'typeorm';
import { InentoryCreateDto } from './dto/create-inventor.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createInventory: InentoryCreateDto): Promise<Inventory | null> {
    const { name, price, quantity } = createInventory;
    if (name == '' || !price || !quantity) {
      throw new NotFoundException('Name, Price and quantity is Required');
    }
    const inventory = this.inventoryRepository.create({
      name,
      price,
      quantity,
    });
    return this.inventoryRepository.save(inventory);
  }

  async get(id: number): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({ where: { id } });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    } else {
      return inventory;
    }
  }

  async getAll(): Promise<Inventory[] | null> {
    const inventory = await this.inventoryRepository.find();
    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    } else {
      return inventory;
    }
  }

  async validateStock(
    id: number,
    quantity: number,
  ): Promise<{ available: boolean }> {
    if (isNaN(quantity)) {
      throw new BadRequestException('Invalid quantity');
    }
    const inventory = await this.inventoryRepository.findOne({ where: { id } });
    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    } else {
      if (inventory.quantity >= quantity) return { available: true };
      else return { available: false };
    }
  }
}
