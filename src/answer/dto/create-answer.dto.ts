import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty()
  @IsString()
  readonly text: string;

  @ApiProperty()
  @IsNumber()
  readonly applyFormId: number;

  @ApiProperty()
  @IsNumber()
  readonly questionId: number;
}
