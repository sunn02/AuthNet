
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  // console.log('ENtrando al post');
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body: { name: string; password: string}) {
    return this.authService.signIn(body.name, body.password);
  }
}
