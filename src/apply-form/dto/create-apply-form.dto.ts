import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested, IsString, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

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
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsDateString()
  end: Date;
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
