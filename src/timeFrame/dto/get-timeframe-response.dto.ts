import { ApiProperty } from '@nestjs/swagger';
import { TimeFrame } from '@prisma/client';
import { Days } from './enums';

export class GetTimeFrameResponseDto {
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

  static fromTimeFrame(timeFrame: TimeFrame): GetTimeFrameResponseDto {
    const day = Days[timeFrame.day];
    return new GetTimeFrameResponseDto(day, timeFrame.starttime, timeFrame.endtime);
  }
}
