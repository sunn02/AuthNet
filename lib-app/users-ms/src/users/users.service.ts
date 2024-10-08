import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('UsersService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createUserDto: CreateUserDto) {
    return this.user.create({
      data: createUserDto
    });
  }

  findAll() {
    return this.user.findMany({});
  }

  findOne(id: number) {
    return this.user.findUnique({
      where: {id}
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    //En caso que el usuario no exista
    await this.findOne(id);

    return this.user.update({
      where: {id},
      data: updateUserDto,     
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    
    return this.user.delete({
      where: {id}
    });
  }
}
