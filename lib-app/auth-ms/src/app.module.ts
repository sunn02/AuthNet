import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    AuthModule, ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'], 
        },
      },
    ]),
  ],
  providers: [], 
})
export class AppModule {}





