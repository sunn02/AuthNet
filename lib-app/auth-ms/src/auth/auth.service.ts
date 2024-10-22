import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('NATS_CLIENT') private readonly client: ClientProxy,
  ) {}

  async signIn(name: string, password: string): Promise<any> {
    console.log('Iniciando sesión para:', name);

    let user: any;

    try {
      user = await firstValueFrom( this.client.send({ cmd: 'find_one' }, { name }));
      console.log('Usuario encontrado:', user);
      
      if (user?.error) {
        console.error('Error: Usuario no encontrado');
        throw new UnauthorizedException(user.error);  
      }

    } catch (error) {
      console.error('Error al consultar el microservicio:', error);

      if (error.response && error.response.status === 400) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      throw new UnauthorizedException('Error al intentar iniciar sesión');
    }

    if (user?.password !== password) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { sub: user.id, name: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
