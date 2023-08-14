import { Injectable } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateStudyResponseDto } from './dto/create-study-response.dto';
import { GetStudyResponseDto } from './dto/get-study-response.dto';
import { UpdateStudyResponseDto } from './dto/update-study-response.dto';

@Injectable()
export class StudyService {
  constructor(private prisma: PrismaService) {}

  async create(createStudyDto: CreateStudyDto): Promise<CreateStudyResponseDto> {
    const { tags = [], ...data } = createStudyDto;

    const study = await this.prisma.study.create({
      data: {
        leader: {
          connect: { id: 1 }, // temporary user id
        },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        ...data,
      },
      include: {
        tags: true,
      },
    });
    return CreateStudyResponseDto.fromStudy(study);
  }

  async findAll(): Promise<GetStudyResponseDto[]> {
    const studies = await this.prisma.study.findMany({
      include: {
        tags: true,
      },
    });
    return studies.map((study) => GetStudyResponseDto.fromStudy(study));
  }

  async findOne(id: number): Promise<GetStudyResponseDto> {
    const study = await this.prisma.study.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });
    return GetStudyResponseDto.fromStudy(study);
  }

  async update(id: number, updateStudyDto: UpdateStudyDto): Promise<UpdateStudyResponseDto> {
    const { tags, ...data } = updateStudyDto;

    const study = await this.prisma.study.update({
      where: { id },
      data: {
        tags: {
          set: [],
          connectOrCreate: tags.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
        ...data,
      },
      include: {
        tags: true,
      },
    });

    return UpdateStudyResponseDto.fromStudy(study);
  }

  async remove(id: number) {
    return await this.prisma.study.delete({ where: { id } });
  }

  async getStudiesByTag(tagName: string) {
    const studies = await this.prisma.study.findMany({
      where: {
        tags: {
          some: {
            name: tagName,
          },
        },
      },
      include: {
        tags: true,
      },
    });
    return studies.map((study) => GetStudyResponseDto.fromStudy(study));
  }
}
