import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GetAnswerResponseDto } from './dto/get-answer-response.dto';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<GetAnswerResponseDto[]> {
    const answers = await this.prisma.answer.findMany();
    return answers.map((answer) => GetAnswerResponseDto.fromAnswer(answer));
  }

  async findOne(id: number): Promise<GetAnswerResponseDto> {
    const answer = await this.prisma.answer.findUnique({ where: { id } });
    return GetAnswerResponseDto.fromAnswer(answer);
  }
}
