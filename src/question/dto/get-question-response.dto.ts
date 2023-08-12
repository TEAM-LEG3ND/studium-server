import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Question } from '@prisma/client';

export class GetQuestionResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsNumber()
  readonly text: string;

  @ApiProperty()
  @IsNumber()
  readonly studyId: number;

  constructor(id: number, text: string, studyId: number) {
    this.id = id;
    this.text = text;
    this.studyId = studyId;
  }

  static fromQuestion(question: Question) {
    return new GetQuestionResponseDto(question.id, question.text, question.studyId);
  }
}
