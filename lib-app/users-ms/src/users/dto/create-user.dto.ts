import { IsNotEmpty, isNumber, IsPhoneNumber, isString, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty() 
    name: string;

    @IsString()
    @IsNotEmpty() 
    email: string;

    @IsString()
    @IsNotEmpty() 
    password: string;

    @IsString()
    phoneNo: string;
}
