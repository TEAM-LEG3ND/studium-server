import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { UpdateUserResponseDto } from './dto/update-user-response.dto';
import { StudiumException } from 'src/common/studium-exception';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

    async findAll(): Promise<GetUserResponseDto[]> {
        const users: User[] = await this.prisma.user.findMany();  
        return users.map((user) => GetUserResponseDto.fromUser(user));
    }

    async findOne(userId: number): Promise<GetUserResponseDto>{
        if (isNaN(userId)) {
            throw new BadRequestException(StudiumException.idFormatError);
        }

        const user: User = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new InternalServerErrorException(StudiumException.dataNotFound);
        } 

      return GetUserResponseDto.fromUser(user);
    }

    async checkNickname(nickname: string) {
        const user = await this.prisma.user.findUnique({ where: { nickname } });
        return { available: !user && this.checkNicknameAvailability(nickname) };
    }

    checkNicknameAvailability(nickname: string): boolean {
        const reservedNicknames = [
            'admin',
            'root',
            'moderator',
        ];

        if (nickname.length < 3 || nickname.length > 20) {
            return false;
        }

        if (!/^[a-zA-Z0-9]+$/.test(nickname)) {
            return false;
        }

        if(reservedNicknames.includes(nickname)) {
            return false;
        }

        return true;
    }

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
      const user: User = await this.prisma.user.create({
          data: {
              ...createUserDto,
          },
      });

      return CreateUserResponseDto.fromUser(user);
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
      const user: GetUserResponseDto = await this.findOne(userId);
      const { nickname } = updateUserDto;

      const ok = (await this.checkNickname(nickname)).available;

      if (!ok) {
          throw new InternalServerErrorException();
      }

      const updatedUser: User = await this.prisma.user.update({
          where: { id: user['id'] },
          data: updateUserDto,
      });

      return UpdateUserResponseDto.fromUser(updatedUser);
  }

  async remove(id: number): Promise<void> {
      const user = await this.findOne(id);
      await this.prisma.user.delete({
          where: { id: user['id'] },
      });
      return;
  }
}
