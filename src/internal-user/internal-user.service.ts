import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { InternalGetUserResponseDto } from './dto/i-get-user-response.dto';

@Injectable()
export class InternalUserService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<InternalGetUserResponseDto[]> {
        const users: User[] = await this.prisma.user.findMany();
        const responseUsers = users.map((user) => {
            const { id, createdAt, updatedAt, universalAccountId, manners, intro, profileURL }: InternalGetUserResponseDto = user;
            return { id, createdAt, updatedAt, universalAccountId, manners, intro, profileURL };
        });

        return responseUsers;
    }

    async findOne(userId: number): Promise<InternalGetUserResponseDto>{
        if (isNaN(userId)) {
            throw new BadRequestException('Bad request for find unique user.');
        }

        const user: User = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new InternalServerErrorException(`User with ID: ${userId} not Found.`);
        } 

        const { id, createdAt, updatedAt, universalAccountId, manners, intro, profileURL }: InternalGetUserResponseDto = user;
        return { id, createdAt, updatedAt, universalAccountId, manners, intro, profileURL };
    }
}
