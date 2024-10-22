import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    ClientsModule.register([
      {
        name: 'NATS_CLIENT',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'], 
      }
    }
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}









