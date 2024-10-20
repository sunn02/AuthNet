import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class UsersMessagingService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publishUserCreated(user: any) {
    await this.amqpConnection.publish('exchange1', 'user.created', user);
  }
}






