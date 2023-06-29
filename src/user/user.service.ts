import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        return await this.prisma.user.findMany();
    }
}
