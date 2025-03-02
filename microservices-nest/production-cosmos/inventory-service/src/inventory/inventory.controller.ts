import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InentoryCreateDto } from './dto/create-inventor.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    // Cerate inventory item
    @Post('/')
    @UsePipes(ValidationPipe)
    async createInventory(@Body() createInventoryDto: InentoryCreateDto) {
      return await this.inventoryService.create(createInventoryDto);
    }
    
    // Get all inventory items
    @Get('/all')
    async getAllInventory() {
      return await this.inventoryService.get();
    }
  
    // Validate item availability
    @Get('/products/:id/validate')
    async validateStock(@Param('id') id: number, @Query('quantity') quantity: number) {
      return await this.inventoryService.validateStock(id, quantity);
    }
  
    // Get a inventory item
    @Get(':id')
    async get(@Param('id') id: number) {
      return await this.inventoryService.get(Number(id));
    }
    
}
