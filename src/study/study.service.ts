import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateStudyResponseDto } from './dto/create-study-response.dto';
import { GetStudyResponseDto } from './dto/get-study-response.dto';
import { UpdateStudyResponseDto } from './dto/update-study-response.dto';
import { GetNoticeResponseDto } from 'src/notice/dto/get-notice-response.dto';
import { StudiumException } from 'src/common/studium-exception';
import { GetJournalResponseDto } from 'src/journal/dto/get-journal-response.dto';

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
        leader: true,
        tags: true,
        questions: true,
      },
    });
    return CreateStudyResponseDto.fromStudy(study);
  }

  async findAll(): Promise<GetStudyResponseDto[]> {
    const studies = await this.prisma.study.findMany({
      include: {
        leader: true,
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
        leader: true,
        tags: true,
        questions: true,
      },
    });

    if (!study) {
      throw new InternalServerErrorException(StudiumException.dataNotFound);
    }

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
        leader: true,
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
          lte: now, // less than or equal to
        },
      },
      include: {
        tags: true,
        questions: true,
      },
      orderBy: {
        viewCount: 'desc',
      },
      take: 12,
    });
    return studies.map((study) => GetStudyResponseDto.fromStudy(study));
  }

  async incrementViewCount(id: number): Promise<UpdateStudyResponseDto> {
    const study = await this.prisma.study.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
    return UpdateStudyResponseDto.fromStudy(study);
  }

  async findNotices(id: number): Promise<GetNoticeResponseDto[]> {
    const study = await this.findOne(id);
    const notices = await this.prisma.notice.findMany({
      where: { studyId: study.id },
    });

    return notices.map((notice) => GetNoticeResponseDto.fromNotice(notice));
  }

  async findNotice(id: number): Promise<GetNoticeResponseDto> {
    const study = await this.findOne(id);
    const notice = await this.prisma.notice.findFirst({
      where: { studyId: study.id },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return GetNoticeResponseDto.fromNotice(notice);
  }

  async findJournals(id: number): Promise<GetJournalResponseDto[]> {
    const study = await this.findOne(id);
    const journals = await this.prisma.journal.findMany({
      where: { studyId: study.id },
    });

    return journals.map((journal) => GetJournalResponseDto.fromJournal(journal));
  }

  async getStudiesSortByTime(): Promise<GetStudyResponseDto[]> {
    const studies = await this.prisma.study.findMany({
      include: {
        leader: true,
        tags: true,
        questions: true,
      },
      orderBy: {
        createdAt: 'desc', // Sort by createdAt in ascending order
      },
    });

    return studies.map((study) => GetStudyResponseDto.fromStudy(study));
  }

  async getStudiesSortByViewCount(): Promise<GetStudyResponseDto[]> {
    try {
      const studies = await this.prisma.study.findMany({
        include: {
          leader: true,
          tags: true,
          questions: true,
        },
        orderBy: {
          viewCount: 'desc', // Sort by viewCount in descending order
        },
      });

      return studies.map((study) => GetStudyResponseDto.fromStudy(study));
    } catch (error) {
      // Handle the error here, you can log it or return an error response
      console.error('Error fetching studies:', error);
      throw new Error('Failed to fetch studies');
    }
  }
}
