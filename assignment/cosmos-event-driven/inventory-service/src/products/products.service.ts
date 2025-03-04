import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Kafka } from 'kafkajs';
import { Redis } from 'ioredis';

@Injectable()
export class ProductsService implements OnModuleInit {
  private readonly Kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
  private readonly redis = new Redis({ host: '3.0.159.213', port: 6379 });
  private readonly producer = this.Kafka.producer();
  private readonly consumer = this.Kafka.consumer({
    groupId: 'buddhika-inventory-service',
  });

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumerOrderCreated();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async validateStock(
    id: number,
    quantity: number,
  ): Promise<{ available: boolean }> {
    const product = await this.getProductById(id);
    return { available: product.quantity >= quantity };
  }
  async reduceStock(id: number, quantity: number): Promise<Product> {
    const product = await this.getProductById(id);
    if (product.quantity < quantity) {
      throw new BadRequestException(`Not enough stock for Product ID ${id}`);
    }
    product.quantity -= quantity;
    return this.productRepository.save(product);
  }

  async consumerOrderCreated() {
    await this.consumer.subscribe({ topic: 'buddhika.order.create' });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const { customerId, customerName, items, city } = JSON.parse(
          message.value.toString(),
        );
        console.log(city, '>>>>>>>>>>>>>>>>>>>>>>>>');

        for (const item of items) {
          await this.reduceStock(item.productId, item.quantity);
          const lockKey = `buddhika:product:${item.productId}`;
          console.log(lockKey);

          const lock = await this.redis.del(lockKey);
        }
        await this.producer.send({
          topic: 'buddhika.order.inventory.update',
          messages: [
            {
              value: JSON.stringify({ customerId, customerName, items, city }),
            },
          ],
        });
      },
    });
  }
}
