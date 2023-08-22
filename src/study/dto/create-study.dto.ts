import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsEnum, IsArray } from 'class-validator';
import { Location } from './enums';

export class CreateStudyDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @ApiProperty()
  readonly recruitStartDate: Date;

  @IsOptional()
  @ApiProperty()
  readonly recruitEndDate: Date;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly intro: string;

  @IsOptional()
  @ApiProperty()
  @IsArray()
  readonly rules: string[];

  @IsOptional()
  @ApiProperty()
  readonly startDate: Date;

  @IsOptional()
  @ApiProperty()
  readonly endDate: Date;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly locationDetail: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  readonly total: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  readonly recruited: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  readonly templateContent: string;

  @IsOptional()
  @ApiProperty({ type: [String], default: [] })
  readonly tags: string[];

  @ApiProperty({
    enum: Location,
    description: 'Location of the study (ONLINE or OFFLINE)',
  })
  @IsEnum(Location)
  location: Location;

  @IsOptional()
  @ApiProperty({ type: [String], default: [] })
  readonly questions: string[];


  /*
  
  @IsOptional()
  @ApiProperty({ type: [String] })
  rules: string[];
  
  @IsOptional()
  @ApiProperty({ required: false, enum: ['RECRUITING', 'PROGRESS', 'EVALUATE', 'COMPLETE'] })
  role: studyStatus;


  */
}
