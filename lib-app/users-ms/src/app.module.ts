import { Module } from '@nestjs/common';
import { NatsConfigModule } from './users/shared/nats-config.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    NatsConfigModule,
    UsersModule, // Asegúrate de importar el módulo de usuarios
  ],
})
export class AppModule {}







