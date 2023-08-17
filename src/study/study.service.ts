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
    const { tags = [], questions = [], ...data } = createStudyDto;

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
        questions: {
          create: questions.map((questionText) => ({
            text: questionText,
          })),
        },
        ...data,
      },
      include: {
        tags: true,
        questions: true,
      },
    });
    return CreateStudyResponseDto.fromStudy(study);
  }

  async findAll(): Promise<GetStudyResponseDto[]> {
    const studies = await this.prisma.study.findMany({
      include: {
        tags: true,
        questions: true,
      },
    });
    return studies.map((study) => GetStudyResponseDto.fromStudy(study));
  }

  async findOne(id: number): Promise<GetStudyResponseDto> {
    const study = await this.prisma.study.findUnique({
      where: { id },
      include: {
        tags: true,
        questions: true,
      },
    });
    return GetStudyResponseDto.fromStudy(study);
  }

  async update(id: number, updateStudyDto: UpdateStudyDto): Promise<UpdateStudyResponseDto> {
    const { tags, questions, ...data } = updateStudyDto;

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
        questions: {
          // Delete existing questions and recreate the updated ones
          deleteMany: {},
          create: questions.map((questionText) => ({
            text: questionText,
          })),
        },
        ...data,
      },

      include: {
        tags: true,
        questions: true,
      },
    });

    return UpdateStudyResponseDto.fromStudy(study);
  }

  async remove(id: number) {
    const studyToDelete = await this.prisma.study.findUnique({
      where: { id },
      include: { questions: true }, // Include associated questions
    });
    // Delete associated questions first
    await Promise.all(
      studyToDelete.questions.map((question) => this.prisma.question.delete({ where: { id: question.id } })),
    );

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
        questions: true,
      },
    });
    return studies.map((study) => GetStudyResponseDto.fromStudy(study));
  }

  async getStudiesOnFire(): Promise<GetStudyResponseDto[]> {
    const THREE_WEEKS_IN_MILLI_SEC = 3 * 7 * 24 * 60 * 60 * 1000;
    const now = new Date();
    const threeWeeksAgo = new Date(now.getTime() - THREE_WEEKS_IN_MILLI_SEC);

    const studies = await this.prisma.study.findMany({
      where: {
        createdAt: {
          gte: threeWeeksAgo, // greater than or equal to
          lte: now            // less than or equal to
        }
      },
      include: {
        tags: true,
        questions: true,
      },
      orderBy: {
        viewCount: 'desc',
      },
      take: 10,
    });
    return studies.map((study) => GetStudyResponseDto.fromStudy(study));
  }
}
