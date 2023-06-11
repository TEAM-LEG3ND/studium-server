import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async createUser(params: { data: Prisma.UserCreateInput }): Promise<User> {
        const { data } = params;
        return this.prisma.user.create({ data });
      }
    
    async getUsers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({ skip, take, cursor, where, orderBy });
    }
    
    async updateTweet(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({ where, data });
    }
    
    async deleteTweet(params: {
        where: Prisma.UserWhereUniqueInput;
    }): Promise<User> {
        const { where } = params;
        return this.prisma.user.delete({ where });
    }
}