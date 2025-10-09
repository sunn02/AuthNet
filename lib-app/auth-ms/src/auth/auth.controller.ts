
import { Request, Controller, Post, HttpCode, HttpStatus, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginDto: LoginDto) {
    const user = {
      email: loginDto.email,
      password: loginDto.password
    };
    console.log('Intentando iniciar sesión para:', user);
    return this.authService.signIn(user);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() registerDto: RegisterDTO) {
    const newUser = {
      email: registerDto.email,
      password: registerDto.password,
      username: registerDto.username,
      phoneNo: registerDto.phoneNo,
      role: registerDto.role
    };
    console.log('Registrando usuario:', newUser);
    return this.authService.signUp(newUser);
  }
}
