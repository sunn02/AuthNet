import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor() {}

  @Post()
  createUser(){
    return 'Crea un producto';
  }

  @Get()
  findAllUsers(){
    return 'Regresa usuarios';
  }
  
  @Get(':id')
  findOne(@Param('id') id: string ){
    return 'Regresa el usuario ' + id;
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