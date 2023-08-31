import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Question, TimeFrame } from '@prisma/client';

export class GetTimeFrameResponseDto {
  @ApiProperty()
  readonly start: Date;

  @ApiProperty()
  readonly end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  static fromTimeFrame(timeFrame: TimeFrame) {
    return new GetTimeFrameResponseDto(timeFrame.start, timeFrame.end);
  }
}
