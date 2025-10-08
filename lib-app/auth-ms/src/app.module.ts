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
          servers: [ process.env.NATS_SERVERS ], 
        },
      },
    ]),
  ],
  providers: [], 
})
export class AppModule {}





