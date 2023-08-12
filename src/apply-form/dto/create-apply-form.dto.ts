import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
export class CreateApplyFormDto {
  @ApiProperty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsNumber()
  readonly studyId: number;
}
