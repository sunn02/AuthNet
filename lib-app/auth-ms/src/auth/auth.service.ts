import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterDTO } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  saltOrRounds: number = 10;

  constructor(
    private jwtService: JwtService,
    @Inject('NATS_CLIENT') private readonly client: ClientProxy,
  ) {}

  async signIn(loginDto: LoginDto): Promise<any> {
    
    console.log('Iniciando sesión para:', loginDto.email);

    let user: any;

    try {
      user = await firstValueFrom( this.client.send({ cmd: 'find_one_by_email' }, { email: loginDto.email }));
      console.log('Usuario encontrado:', user);
      
      if (user?.error) {
        throw new UnauthorizedException(user.error);  
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new UnauthorizedException('Usuario no encontrado');
      }
      throw new UnauthorizedException('Error al intentar iniciar sesión');
    }



    if (user?.password !== loginDto.password) {
      const isMatch = await bcrypt.compare(loginDto.password, user?.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
    }

    
    const payload = { sub: user.id, name: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  async register(registerDto: RegisterDTO): Promise<any> {

    try {
        const existingUser = await firstValueFrom(
        this.client.send({ cmd: 'find_one_by_email' }, { email: registerDto.email })
      );
      if (existingUser && !existingUser.error) {
        throw new UnauthorizedException('El email ya está en uso');
      }

      const hashPass = await bcrypt.hash(registerDto.password, this.saltOrRounds);

      const createdUser = await firstValueFrom(
        this.client.send(
          { cmd: 'create_user' },
          {
            name: registerDto.username,
            email: registerDto.email,
            password: hashPass,
            phoneNo: registerDto.phoneNo,
          },
        ),
      );

      return createdUser;
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw new UnauthorizedException('Error al intentar registrar el usuario');
    }
  }
}
