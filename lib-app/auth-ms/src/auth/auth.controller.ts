
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
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

  @Post('signUp')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() registerDto: RegisterDTO) {
    const newUser = {
      email: registerDto.email,
      password: registerDto.password,
      username: registerDto.username,
      phoneNo: registerDto.phoneNo
    };
    console.log('Registrando usuario:', newUser);
    return this.authService.register(newUser);
  }
}
