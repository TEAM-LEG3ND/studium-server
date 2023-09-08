import { ApiProperty } from '@nestjs/swagger';
import { TimeFrame } from '@prisma/client';
import { Days } from './enums';

export class CreateTimeFrameResponseDto {
  @ApiProperty()
  readonly day: Days;

  @ApiProperty()
  readonly starttime: string;

  @ApiProperty()
  readonly endtime: string;

  constructor(day: Days, starttime: string, endtime: string) {
    this.day = day;
    this.starttime = starttime;
    this.endtime = endtime;
  }

  static fromTimeFrame(timeFrame: TimeFrame): CreateTimeFrameResponseDto {
    const day = Days[timeFrame.day];
    return new CreateTimeFrameResponseDto(day, timeFrame.starttime, timeFrame.endtime);
  }
}
