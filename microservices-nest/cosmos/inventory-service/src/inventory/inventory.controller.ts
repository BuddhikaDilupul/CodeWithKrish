import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InentoryCreateDto } from './dto/create-inventor.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('/')
  async createInventory(@Body() createInventoryDto: InentoryCreateDto) {
    return await this.inventoryService.create(createInventoryDto);
  }
  @Get('/all')
  async getAllInventory() {
    return await this.inventoryService.getAll();
  }

  @Get('/products/:id/validate')
  async validateStock(@Param('id') id: number, @Query('quantity') quantity: number) {
    return await this.inventoryService.validateStock(id, quantity);
  }

  @Get(':id')
  async get(@Param() id: number){
    return await this.inventoryService.get(id);
  }
}
