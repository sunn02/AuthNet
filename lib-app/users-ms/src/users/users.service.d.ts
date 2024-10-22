import { OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
export declare class UsersService extends PrismaClient implements OnModuleInit {
    private readonly logger;
    private breaker;
    constructor();
    onModuleInit(): void;
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        password: string;
        id: number;
        createdAt: Date;
        updateAt: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        password: string;
        id: number;
        createdAt: Date;
        updateAt: Date;
    }[]>;
    private findOneWithoutBreaker;
    findOne(name: string): Promise<any>;
    update(name: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        password: string;
        id: number;
        createdAt: Date;
        updateAt: Date;
    }>;
    remove(name: string): Promise<{
        name: string;
        password: string;
        id: number;
        createdAt: Date;
        updateAt: Date;
    }>;
}
