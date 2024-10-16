import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly usersClient:ClientProxy
  ) {}

  @Post()
  createUser(){
    return 'Crea un producto';
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
    return 'Elimina el usuario ' + id;
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: any){
    return 'Actualiza el usuario ' + id;
  }

}