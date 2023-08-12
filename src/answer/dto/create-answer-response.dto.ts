import { ApiProperty } from '@nestjs/swagger';
import { Answer } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CreateAnswerResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly text: string;

  @ApiProperty()
  @IsNumber()
  readonly applyFormId: number;

  @ApiProperty()
  @IsNumber()
  readonly questionId: number;

  constructor(id: number, text: string, applyFormId: number, questionId: number) {
    this.id = id;
    this.text = text;
    this.applyFormId = applyFormId;
    this.questionId = questionId;
  }

  static fromAnswer(answer: Answer) {
    return new CreateAnswerResponseDto(answer.id, answer.text, answer.applyFormId, answer.questionId);
  }
}
