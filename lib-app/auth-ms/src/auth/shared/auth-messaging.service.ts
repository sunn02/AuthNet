import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class AuthMessagingService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  public async publishMessage(pattern: string, message: any) {
    return this.client.emit(pattern, message); // Publicar un mensaje en la cola
  }

  // Otros métodos según sea necesario
}
