import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { InternalGetUserResponseDto } from './dto/i-get-user-response.dto';

@Injectable()
export class InternalUserService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<InternalGetUserResponseDto[]> {
        const users: User[] = await this.prisma.user.findMany();
        const responseUsers = [];

        users.forEach((user) => {
            const { id, createdAt, updatedAt, universalAccountId, manners, intro, profileURL }: InternalGetUserResponseDto = user;
            responseUsers.push({ id, createdAt, updatedAt, universalAccountId, manners, intro, profileURL });
        });

        return responseUsers;
    }
}
