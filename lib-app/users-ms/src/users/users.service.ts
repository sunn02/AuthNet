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

  async findOne(id: number) {
    const user = await this.user.findFirst({
      where: { id }
    });
    
    if ( !user ){
      throw new RpcException({
          message:`Product with id #${ id } not found`,
          status: HttpStatus.BAD_REQUEST
      });
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const { id: __, ...data } = updateUserDto;
    //En caso que el usuario no exista

    await this.findOne(id);

    return this.user.update({
      where: { id },
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
