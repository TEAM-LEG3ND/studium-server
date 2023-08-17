import { ApiProperty } from '@nestjs/swagger';
import { ApplyForm } from '@prisma/client';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { CreateAnswerResponseDto } from 'src/answer/dto/create-answer-response.dto';
export class CreateApplyFormResponseDto {
  @ApiProperty()
  @IsString()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsNumber()
  readonly studyId: number;

  @IsOptional()
  @ApiProperty({ type: [CreateAnswerResponseDto] })
  readonly answers: CreateAnswerResponseDto[];

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    userId: number,
    studyId: number,
    answers: CreateAnswerResponseDto[],
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
    this.studyId = studyId;
    this.answers = answers;
  }

  static fromApplyForm(applyform: ApplyForm) {
    return new CreateApplyFormResponseDto(
      applyform.id,
      applyform.createdAt,
      applyform.updatedAt,
      applyform.userId,
      applyform.studyId,
      applyform['answers'],
    );
  }
}
