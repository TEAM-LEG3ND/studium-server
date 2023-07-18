import { Injectable, NotFoundException } from '@nestjs/common';
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
        const user: User = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(`User with ID: ${userId} not Found.`);
        } 

        const { id, createdAt, updatedAt, universalAccountId, manners, intro, profileURL }: InternalGetUserResponseDto = user;
        return { id, createdAt, updatedAt, universalAccountId, manners, intro, profileURL };
    }

    async findOneByUniversalId(universalId: number): Promise<InternalGetUserResponseDto>{
        const user: User = await this.prisma.user.findUnique({
            where: { universalAccountId: universalId },
        });

        if (!user) {
            throw new NotFoundException(`User with Leg3nd ID: ${universalId} not Found.`);
        } 

        const { id, createdAt, updatedAt, universalAccountId, manners, intro, profileURL }: InternalGetUserResponseDto = user;
        return { id, createdAt, updatedAt, universalAccountId, manners, intro, profileURL };
    }
}
