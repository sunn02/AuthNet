import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @MessagePattern({ cmd: 'create_user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @MessagePattern({ cmd: 'find_all' })
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':name')
  // @Get(':id')
  @Get(':id')
  @MessagePattern({ cmd: 'find_one_by_id' })
  async findOne(@Payload('id') id: number) {
    console.log('Buscando usuario con id:', id);
    try {
      const user = await this.usersService.findById(id);
      if (!user) {
        return { error: `Usuario con id #${id} no encontrado` };
      }
      return user;
    } catch (error) {
      console.error('Error en la búsqueda del usuario:', error);
      return { error: error.message || 'Error interno al buscar el usuario' }; // Respuesta clara de error
    }
  }

  @MessagePattern({ cmd: 'find_one_by_email' })
  async findbyName(@Payload('email') email: string) {
    console.log('Buscando usuario con email:', email);
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        return { error: `Usuario con email #${email} no encontrado` };
      }
      return user;
    } catch (error) {
      console.error('Error en la búsqueda del usuario:', error);
      return { error: error.message || 'Error interno al buscar el usuario' }; // Respuesta clara de error
    }
  }

  // @Patch(':name')
  // @Patch(':id')
  @MessagePattern({ cmd: 'update_user' })
  update(@Payload() updateUserDto: UpdateUserDto) {
    // @Param('id', ParseIntPipe) id: number,
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  // @Delete(':name')
  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_user' })
  remove(@Payload('id') id: number) {
    return this.usersService.remove(id);
  }
}
