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
export class UsersService {
  private readonly logger = new Logger('UsersService');
  private breaker: CircuitBreaker;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    user.phoneNo = createUserDto.phoneNo;
    user.role = createUserDto.role;

    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

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
