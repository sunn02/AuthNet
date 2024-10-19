import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty() // Asegura que el campo no esté vacío
  username: string;

  @IsString()
  @IsNotEmpty() // Asegura que el campo no esté vacío
  password: string;
}
