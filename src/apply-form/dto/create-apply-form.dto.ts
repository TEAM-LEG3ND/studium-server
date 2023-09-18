import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Days } from 'src/timeFrame/dto/enums';

class AnswerPair {
  @ApiProperty()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsString()
  text: string;
}

class TimeFrame {
  @ApiProperty()
  @IsEnum(Days)
  day: Days;

  @ApiProperty()
  @IsString()
  starttime: string;

  @ApiProperty()
  @IsString()
  endtime: string;
}

export class CreateApplyFormDto {
  @ApiProperty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsNumber()
  readonly studyId: number;

  @ApiProperty({ type: [AnswerPair] })
  @ValidateNested({ each: true })
  @Type(() => AnswerPair)
  answers: AnswerPair[];

  @ApiProperty({ type: [TimeFrame] })
  @ValidateNested({ each: true })
  @Type(() => TimeFrame)
  timeFrames: TimeFrame[];
}
