import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Inventory } from './entity/inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InentoryCreateDto } from './dto/create-inventor.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  // Create inventory item
  async create(createInventory: InentoryCreateDto): Promise<Inventory | null> {
    const { name, price, quantity } = createInventory;

    const inventory = this.inventoryRepository.create({
      name,
      price,
      quantity,
    });

    // Save inventory item to db
    return this.inventoryRepository.save(inventory);
  }

  // Fetch inventory item by id or all
  async get(id?: number): Promise<Inventory | Inventory[]> {
    let inventory: Inventory | Inventory[];

    // Fetch data by id
    if (id !== undefined) {
      inventory = await this.inventoryRepository.findOne({
        where: { id: id },
      });

      // Throw error if not exist
      if (!inventory) {
        throw new NotFoundException(`Inventory item with ID ${id} not found`);
      }
    } else {
      // If id having fetch all
      inventory = await this.inventoryRepository.find();
    }

    return inventory;
  }

  // Validate stock availability
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
      return { available: inventory.quantity >= quantity };
    }
  }
}
