// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AuthService {}


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../../users-ms/src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {}

  async signIn(
    name: string, password: string):Promise<any> {
    console.log('Iniciando sesión para:', name);
    
    const user = await this.usersService.findOne(name);
    console.log('Usuario encontrado:', user);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, name: user.name };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}


