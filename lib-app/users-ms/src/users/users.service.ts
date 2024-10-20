import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import CircuitBreaker = require('opossum');
import { UsersMessagingService } from './shared/user-messaging.service';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('UsersService');
  private breaker: CircuitBreaker;

  constructor(private readonly usersMessagingService: UsersMessagingService) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
    this.breaker = new CircuitBreaker(this.findOneWithoutBreaker.bind(this), {
      timeout: 5000, // Tiempo máximo de espera antes de considerar fallida la llamada
      errorThresholdPercentage: 50, // 50% de fallos para abrir el circuito
      resetTimeout: 10000, // Tiempo antes de reintentar
    });

    this.breaker.on('open', () => this.logger.warn('Circuito abierto - Deteniendo llamadas'));
    this.breaker.on('halfOpen', () => this.logger.log('Circuito medio abierto - Reintentando...'));
    this.breaker.on('close', () => this.logger.log('Circuito cerrado - Llamadas restauradas'));
  
  }


  async create(createUserDto: CreateUserDto) {
    const user = await this.user.create({
      data: createUserDto
    });

    await this.usersMessagingService.publishUserCreated(user);
    return user;
  }

  findAll() {
    return this.user.findMany({});
  }

//FindOne original
  private async findOneWithoutBreaker(name: string) {
    const user = await this.user.findFirst({
      where: { name }
    });
    
    if ( !user ){
      throw new RpcException({
          message:`User with name #${ name } not found`,
          status: HttpStatus.BAD_REQUEST
      });
    }

    return user;
  }

  async findOne(name: string): Promise<any> {
    try {
      return await this.breaker.fire(() => this.findOneWithoutBreaker(name)); // Aquí llamamos al Circuit Breaker
    } catch (error) {
      this.logger.error(`Error fetching user ${name}: ${error.message}`);
      throw new RpcException({
        message: `Error fetching user: ${error.message}`,
        status: HttpStatus.SERVICE_UNAVAILABLE,
      });
    }
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
