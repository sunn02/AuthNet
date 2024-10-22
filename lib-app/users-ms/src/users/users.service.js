"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const microservices_1 = require("@nestjs/microservices");
const CircuitBreaker = require("opossum");
let UsersService = class UsersService extends client_1.PrismaClient {
    constructor() {
        super();
        this.logger = new common_1.Logger('UsersService');
    }
    onModuleInit() {
        this.$connect();
        this.logger.log('Database connected');
        this.breaker = new CircuitBreaker(this.findOneWithoutBreaker.bind(this), {
            timeout: 5000,
            errorThresholdPercentage: 50,
            resetTimeout: 10000,
        });
        this.breaker.on('open', () => this.logger.warn('Circuito abierto - Deteniendo llamadas'));
        this.breaker.on('halfOpen', () => this.logger.log('Circuito medio abierto - Reintentando...'));
        this.breaker.on('close', () => this.logger.log('Circuito cerrado - Llamadas restauradas'));
    }
    async create(createUserDto) {
        const user = await this.user.create({
            data: createUserDto
        });
        this.logger.log(`Usuario creado: ${JSON.stringify(user)}`);
        return user;
    }
    findAll() {
        return this.user.findMany({});
    }
    async findOneWithoutBreaker(name) {
        const user = await this.user.findFirst({
            where: { name }
        });
        if (!user) {
            throw new microservices_1.RpcException({
                message: `User with name #${name} not found`,
                status: common_1.HttpStatus.BAD_REQUEST
            });
        }
        return user;
    }
    async findOne(name) {
        try {
            return await this.breaker.fire(() => this.findOneWithoutBreaker(name));
        }
        catch (error) {
            this.logger.error(`Error fetching user ${name}: ${error.message}`);
            throw new microservices_1.RpcException({
                message: `Error fetching user: ${error.message}`,
                status: common_1.HttpStatus.SERVICE_UNAVAILABLE,
            });
        }
    }
    async update(name, updateUserDto) {
        const { name: __, ...data } = updateUserDto;
        await this.findOne(name);
        return this.user.update({
            where: { name },
            data: updateUserDto,
        });
    }
    async remove(name) {
        await this.findOne(name);
        return this.user.delete({
            where: { name }
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersService);
//# sourceMappingURL=users.service.js.map