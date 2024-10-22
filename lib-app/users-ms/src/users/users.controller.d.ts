import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findOne(name: string): Promise<any>;
    update(updateUserDto: UpdateUserDto): Promise<{
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
