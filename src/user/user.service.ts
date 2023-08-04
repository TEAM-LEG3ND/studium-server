import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
        return users.map((user) => { return new GetUserResponseDto(user); });
    }

    async findOne(userId: number): Promise<GetUserResponseDto>{
        if (isNaN(userId)) {
            throw new BadRequestException('Bad request for find unique user.');
        }

        const user: User = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new InternalServerErrorException(`User with ID: ${userId} not Found.`);
        } 

      return new GetUserResponseDto(user);
    }

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
      const user: User = await this.prisma.user.create({
          data: {
              ...createUserDto,
          },
      });

      return new CreateUserResponseDto(user);
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
      const user: GetUserResponseDto = await this.findOne(userId);
      const updatedUser: User = await this.prisma.user.update({
          where: { id: user['id'] },
          data: updateUserDto,
      });

      return new UpdateUserResponseDto(updatedUser);
  }

  async remove(id: number): Promise<void> {
      const user = await this.findOne(id);
      await this.prisma.user.delete({
          where: { id: user['id'] },
      });
      return;
  }
}
