import { Body, Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  @MessagePattern({ cmd: 'create_user'}) 
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @MessagePattern({ cmd: 'find_all'})
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':name')
  // @Get(':id')
@MessagePattern({ cmd: 'find_one' })
async findOne(@Payload('name') name: string) {
  console.log('Buscando usuario con nombre:', name);
  try {
    const user = await this.usersService.findOneWithoutBreaker(name);
    if (!user) {
      return { error: `Usuario con nombre #${name} no encontrado` };
    }
    return user;
  } catch (error) {
    console.error('Error en la búsqueda del usuario:', error);
    return { error: error.message || 'Error interno al buscar el usuario' };  // Respuesta clara de error
  }
}


  // @Patch(':name')
  // @Patch(':id')
  @MessagePattern({ cmd: 'update_user'})
  update(@Payload() updateUserDto: UpdateUserDto,){
    // @Param('id', ParseIntPipe) id: number,
    return this.usersService.update(updateUserDto.name, updateUserDto);
  }

  // @Delete(':name')
  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_user'})
  remove(@Payload('name') name: string) {
    return this.usersService.remove( name );
  }
}
