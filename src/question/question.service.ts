import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GetQuestionResponseDto } from './dto/get-question-response.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<GetQuestionResponseDto[]> {
    const questions = await this.prisma.question.findMany();
    return questions.map((question) => GetQuestionResponseDto.fromQuestion(question));
  }

  async findOne(id: number): Promise<GetQuestionResponseDto> {
    const question = await this.prisma.question.findUnique({ where: { id } });
    return GetQuestionResponseDto.fromQuestion(question);
  }
}
