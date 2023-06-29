import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.user.findUnique({where: {id}});
    }

    async create(createUserDto: CreateUserDto) {
        return await this.prisma.user.create({
            data: {
                ...createUserDto,
            },
        });
    }
}
