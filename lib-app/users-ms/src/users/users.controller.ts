import { Body, Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @MessagePattern({ cmd: 'create_user'}) 
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  // @MessagePattern({ cmd: 'find_all'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':name')
  // @Get(':id')
  // @MessagePattern({ cmd: 'find_one'})
  findOne(@Payload('name') name: string) {
    return this.usersService.findOne(name);
  }

  @Patch(':name')
  // @Patch(':id')
  // @MessagePattern({ cmd: 'update_user'})
  update(
    // @Param('id', ParseIntPipe) id: number, 
    @Body() updateUserDto: UpdateUserDto) {
    // @Payload() updateUserDto: UpdateUserDto,) {
    return this.usersService.update(updateUserDto.name, updateUserDto);
  }

  @Delete(':name')
  // @Delete(':id')
  // @MessagePattern({ cmd: 'delete_user'})
  remove(@Payload('name') name: string) {
    return this.usersService.remove( name );
  }
}
