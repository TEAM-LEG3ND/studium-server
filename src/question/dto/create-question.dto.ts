import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  readonly text: string;

  @ApiProperty()
  @IsNumber()
  readonly studyId: number;
}
