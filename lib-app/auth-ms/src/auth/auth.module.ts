import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { NatsService } from './shared/nats.service';
import { UsersModule } from '../../../users-ms/src/users/users.module'; 
import { NatsConfigModule } from '../../../users-ms/src/users/shared/nats-config.module';

@Module({
  imports: [
    UsersModule, JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    NatsConfigModule,
  ],
  providers: [AuthService, NatsService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}









