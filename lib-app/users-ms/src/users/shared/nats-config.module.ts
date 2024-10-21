import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class NatsConfigModule {}
