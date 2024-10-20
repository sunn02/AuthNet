// shared/rabbitmq-config.module.ts
import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      connectionInitOptions: { wait: false },
    }),
  ],
  exports: [RabbitMQModule], // Exportamos para que otros módulos puedan usar RabbitMQModule
})
export class RabbitMQConfigModule {}
