import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    public name: string;
    @IsString()
    public password: string; 
}
