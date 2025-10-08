import { IsString, IsNotEmpty, IsEmail, isNumber, IsPhoneNumber } from 'class-validator';

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
}