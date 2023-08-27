import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BookmarkStudyDto {
  @ApiProperty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsNumber()
  readonly studyId: number;
}
