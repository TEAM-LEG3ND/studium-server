import { ApiProperty } from '@nestjs/swagger';
import { Question } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CreateQuestionResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
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
    return new CreateQuestionResponseDto(question.id, question.text, question.studyId);
  }
}
