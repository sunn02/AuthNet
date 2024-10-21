import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service'; 
import { NatsConfigModule } from './shared/nats-config.module'; 

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    NatsConfigModule, 
  ],
  exports: [UsersService],
})
export class UsersModule {}


