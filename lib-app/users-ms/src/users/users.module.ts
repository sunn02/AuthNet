import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersMessagingService } from './shared/user-messaging.service';
import { RabbitMQConfigModule } from './shared/rabbitmq-config.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersMessagingService],
  imports: [
    RabbitMQConfigModule, 
  ],
  exports: [UsersService],
})
export class UsersModule {}


