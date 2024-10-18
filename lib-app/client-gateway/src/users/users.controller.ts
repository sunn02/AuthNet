import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersControllerGateway {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly usersClient:ClientProxy
  ) {}

  @Post()
  createUser( @Body() createUserDto: CreateUserDto ){
    return this.usersClient.send({cmd: 'create_user'}, createUserDto);
  }

  @Get()
  findAllUsers(){
    return this.usersClient.send({ cmd: 'find_all'}, { });
  }
  
  @Get(':id')
  findOne(@Param('id') id: string ){
    return this.usersClient.send({ cmd: 'find_one'}, { id });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string ){
    return this.usersClient.send({ cmd: 'delete_user' }, { id });
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe ) id: number,
    @Body() updateUserDto: UpdateUserDto){
      return this.usersClient.send({ cmd: 'update_user'}, { 
        id,
        ...updateUserDto
      });
    }
}