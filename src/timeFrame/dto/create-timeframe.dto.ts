import { ApiProperty } from '@nestjs/swagger';
import { Days } from './enums';
import { IsEnum, IsString } from 'class-validator';

export class CreateTimeFrameDto {
  @ApiProperty()
  @IsEnum(Days)
  readonly day: Days;

  @ApiProperty()
  @IsString()
  readonly starttime: string;

  @ApiProperty()
  @IsString()
  readonly endtime: string;
}
