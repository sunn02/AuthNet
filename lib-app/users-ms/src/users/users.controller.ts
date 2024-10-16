import { Controller, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../../client-gateway/src/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../client-gateway/src/users/dto/update-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  @MessagePattern({ cmd: 'create_user'}) 
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all'})
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update_user'})
  update(
    // @Param('id', ParseIntPipe) id: number, 
    // @Body() updateUserDto: UpdateUserDto) {
    @Payload() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'delete_user'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
