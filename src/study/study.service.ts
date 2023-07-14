import { Injectable } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BadRequestException } from '@nestjs/common';

import { Study } from '@prisma/client';

@Injectable()
export class StudyService {
  constructor(private prisma: PrismaService) {}

  async create(createStudyDto: CreateStudyDto) {
    const { ...data } = createStudyDto;
    
    const study = await this.prisma.study.create({
      data: {
        leader: {
          connect: { id: 0 }, // temporary user id
        },
        ...data,
      },
    });
    return study;
  }

  async findAll() {
    return await this.prisma.study.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.study.findUnique({ where: { id } });
  }

  async update(id: number, updateStudyDto: UpdateStudyDto) {
    return await this.prisma.study.update({
      where: { id },
      data: updateStudyDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.study.delete({ where: { id } });
  }
}
