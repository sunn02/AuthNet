import { Module } from '@nestjs/common';
import { UsersControllerGateway } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'src/config';

@Module({
  controllers: [UsersControllerGateway],
  providers: [],
  imports: [
    ClientsModule.register([
      { name: PRODUCT_SERVICE, 
        transport: Transport.TCP ,
        options: {
          host: envs.usersMicroserviceHost,
          port: envs.usersMicroservicePort
        }
      },
    ])
  ]
})
export class UsersModule {}
