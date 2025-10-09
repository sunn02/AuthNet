
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    let user = {
        email: email,
        password: password
    }
    const idAuthenticated = await this.authService.signIn(user);
    if (!idAuthenticated) {
      throw new UnauthorizedException();
    }
    return idAuthenticated;
  }
}
