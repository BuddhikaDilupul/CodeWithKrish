import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
@Injectable()
export class NotificationService implements OnModuleInit {
  private readonly Kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
  private readonly producer = this.Kafka.producer();
  private readonly consumer = this.Kafka.consumer({
    groupId: 'buddhika-notification-service',
  });
  constructor() {}
  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumeNotification();
  }

  // consume notification
  async consumeNotification() {
    await this.consumer.subscribe({
      topic: 'buddhika.order.confirmed',
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value !== null) {
          const msg = JSON.parse(message.value.toString());
          // Display notification
          console.log(msg.message);
        }
      },
    });
  }
}
