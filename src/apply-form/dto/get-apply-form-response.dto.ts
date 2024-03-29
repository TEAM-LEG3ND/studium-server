import { ApiProperty } from '@nestjs/swagger';
import { ApplyForm } from '@prisma/client';
import { IsString, IsNumber } from 'class-validator';
import { GetAnswerResponseDto } from 'src/answer/dto/get-answer-response.dto';
import { GetTimeFrameResponseDto } from 'src/timeFrame/dto/get-timeframe-response.dto';
export class GetApplyFormResponseDto {
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

  @ApiProperty({ type: [GetAnswerResponseDto] })
  readonly answers: GetAnswerResponseDto[];

  @ApiProperty({ type: [GetTimeFrameResponseDto] })
  readonly timeFrames: GetTimeFrameResponseDto[];

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    userId: number,
    studyId: number,
    answers: GetAnswerResponseDto[],
    timeFrames: GetTimeFrameResponseDto[],
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
    this.studyId = studyId;
    this.answers = answers;
    this.timeFrames = timeFrames;
  }

  static fromApplyForm(applyform: ApplyForm) {
    return new GetApplyFormResponseDto(
      applyform.id,
      applyform.createdAt,
      applyform.updatedAt,
      applyform.userId,
      applyform.studyId,
      applyform['answers'],
      applyform['timeFrames'],
    );
  }
}
