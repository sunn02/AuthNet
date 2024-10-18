import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from '../../../client-gateway/src/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../client-gateway/src/users/dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

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

  async findOne(name: string) {
    const user = await this.user.findFirst({
      where: { name }
    });
    
    if ( !user ){
      throw new RpcException({
          message:`Product with name #${ name } not found`,
          status: HttpStatus.BAD_REQUEST
      });
    }

    return user;
  }

  async update(name: string, updateUserDto: UpdateUserDto) {

    const { name: __, ...data } = updateUserDto;
    //En caso que el usuario no exista

    await this.findOne(name);

    return this.user.update({
      where: { name },
      data: updateUserDto,     
    });
  }

  async remove(name: string) {
    await this.findOne(name);
    
    return this.user.delete({
      where: {name}
    });
  }
}
