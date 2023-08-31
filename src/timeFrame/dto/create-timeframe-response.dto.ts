import { ApiProperty } from '@nestjs/swagger';
import { TimeFrame } from '@prisma/client';

export class CreateTimeFrameResponseDto {
  @ApiProperty()
  readonly start: Date;

  @ApiProperty()
  readonly end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  static fromTimeFrame(timeFrame: TimeFrame) {
    return new CreateTimeFrameResponseDto(timeFrame.start, timeFrame.end);
  }
}
