import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { UpdateUserResponseDto } from './dto/update-user-response.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<GetUserResponseDto[]> {
        const users: User[] = await this.prisma.user.findMany();
        const responseUsers = users.map((user) => {
            const { id, manners, intro, profileURL }: GetUserResponseDto = user;
            return { id, manners, intro, profileURL };
        });

        return responseUsers;
    }

    async findOne(userId: number): Promise<GetUserResponseDto>{
        const user: User = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(`User with ID: ${userId} not Found.`);
        } 

        const { id, manners, intro, profileURL }: GetUserResponseDto = user;
        return { id, manners, intro, profileURL };
    }

    async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
        const user: User = await this.prisma.user.create({
            data: {
                ...createUserDto,
            },
        });

        const { id, createdAt, manners, intro, profileURL }: CreateUserResponseDto = user;
        return { id, createdAt, manners, intro, profileURL };
    }

    async update(userId: number, updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
        const getUser: GetUserResponseDto = await this.findOne(userId);
        const user: User = await this.prisma.user.update({
            where: { id: getUser['id'] },
            data: updateUserDto,
        });

        const { id, updatedAt, manners, intro, profileURL }: UpdateUserResponseDto = user;
        return { id, updatedAt, manners, intro, profileURL };
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.prisma.user.delete({
            where: { id: user['id'] },
        });
        return;
    }
}
