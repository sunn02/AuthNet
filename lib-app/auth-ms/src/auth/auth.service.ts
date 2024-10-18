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
    name: string, 
    pass: string)
    :Promise<any> {
    const user = await this.usersService.findOne(name);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}


