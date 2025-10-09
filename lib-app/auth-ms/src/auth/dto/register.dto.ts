import { IsString, IsNotEmpty, IsEmail, isNumber, IsPhoneNumber, isString } from 'class-validator';

export class RegisterDTO {
    @IsString()
    @IsNotEmpty() 
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty() 
    password: string;

    @IsString()
    phoneNo: string;

    @IsString()
    @IsNotEmpty() 
    role: string
}