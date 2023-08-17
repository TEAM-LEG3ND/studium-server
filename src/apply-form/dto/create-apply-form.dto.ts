import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerPair {
  @ApiProperty()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsString()
  text: string;
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
}
