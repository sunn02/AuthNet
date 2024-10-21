import { Injectable } from '@nestjs/common';
import { connect, NatsConnection } from 'nats';

@Injectable()
export class NatsService {
  private natsConnection: NatsConnection;

  async onModuleInit() {
    this.natsConnection = await connect({ servers: ['nats://localhost:4222'] });
  }

  async publish(subject: string, data: any) {
    await this.natsConnection.publish(subject, JSON.stringify(data));
  }

  async closeConnection() {
    await this.natsConnection.close();
  }
}



