import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RpcException } from '@nestjs/microservices';
import CircuitBreaker = require('opossum');
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
// export class UsersService implements OnModuleInit {
export class UsersService {
  private readonly logger = new Logger('UsersService');
  private breaker: CircuitBreaker;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // onModuleInit() {
  //   this.$connect();
  //   this.logger.log('Database connected');
  //   this.breaker = new CircuitBreaker(this.findOneWithoutBreaker.bind(this), {
  //     timeout: 5000, // Tiempo máximo de espera antes de considerar fallida la llamada
  //     errorThresholdPercentage: 50, // 50% de fallos para abrir el circuito
  //     resetTimeout: 10000, // Tiempo antes de reintentar
  //   });

  //   this.breaker.on('open', () => this.logger.warn('Circuito abierto - Deteniendo llamadas'));
  //   this.breaker.on('halfOpen', () => this.logger.log('Circuito medio abierto - Reintentando...'));
  //   this.breaker.on('close', () => this.logger.log('Circuito cerrado - Llamadas restauradas'));

  // }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    user.phoneNo = createUserDto.phoneNo;
    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  //FindOne original
  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // async findOne(email: string): Promise<any> {
  //   try {
  //     console.log(email);
  //     return await this.breaker.fire(() => this.findOneWithoutBreaker(email)); // Aquí llamamos al Circuit Breaker
  //   } catch (error) {
  //     this.logger.error(`Error fetching user ${email}: ${error.message}`);
  //     throw new RpcException({
  //       message: `Error fetching user: ${error.message}`,
  //       status: HttpStatus.SERVICE_UNAVAILABLE,
  //     });
  //   }
  // }

  async update(id: number, updatedUser: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update({ id }, updatedUser);
    return user;
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
