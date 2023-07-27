import { Injectable } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { CreateStudyResponseDto } from './dto/create-study-response.dto';
import { GetStudyResponseDto } from './dto/get-study-response.dto';
import { UpdateStudyResponseDto } from './dto/update-study-response.dto';
import { Study } from '@prisma/client';

@Injectable()
export class StudyService {
  constructor(private prisma: PrismaService) {}

  async create(createStudyDto: CreateStudyDto): Promise<CreateStudyResponseDto> {
    const { ...data } = createStudyDto;

    const study = await this.prisma.study.create({
      data: {
        leader: {
          connect: { id: 3 }, // temporary user id
        },
        ...data,
      },
    });
    return new CreateStudyResponseDto(study);
  }

  async findAll(): Promise<GetStudyResponseDto[]> {
    const studies = await this.prisma.study.findMany();
    return studies.map((study) => new GetStudyResponseDto(study));
  }

  async findOne(id: number): Promise<GetStudyResponseDto> {
    const study = await this.prisma.study.findUnique({ where: { id } });
    return new GetStudyResponseDto(study);
  }

  async update(id: number, updateStudyDto: UpdateStudyDto): Promise<UpdateStudyResponseDto> {
    const updatedStudy = await this.prisma.study.update({
      where: { id },
      data: updateStudyDto,
    });
    return new UpdateStudyResponseDto(updatedStudy);
  }

  async remove(id: number) {
    return await this.prisma.study.delete({ where: { id } });
  }
}
