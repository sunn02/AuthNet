import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../../../users-ms/src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthMessagingService } from './shared/auth-messaging.service';
import { RabbitMQConfigModule } from './shared/rabbitmq-config.module';

@Module({
  imports: [
    UsersModule,
    RabbitMQConfigModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: true, // Asegúrate de que 'durable' esté en las opciones de cola
          },
        },
      },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, AuthMessagingService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}







