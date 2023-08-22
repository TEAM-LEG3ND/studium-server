import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateNoticeDto {
  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsNumber()
  readonly studyId: number;
}
