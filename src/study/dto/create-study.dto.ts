import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateStudyDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly title: string;

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
  readonly startDate: Date;

  @IsOptional()
  @ApiProperty()
  readonly endDate: Date;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly location: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  readonly recruiting: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  readonly recruited: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  readonly studyTemplate: string;

  @IsOptional()
  @ApiProperty()
  readonly questionnaire;

  @IsOptional()
  @ApiProperty({ type: [String], default: [] })
  readonly tags: string[];

  /*
  
  @IsOptional()
  @ApiProperty({ type: [String] })
  rules: string[];
  
  @IsOptional()
  @ApiProperty({ required: false, enum: ['RECRUITING', 'PROGRESS', 'EVALUATE', 'COMPLETE'] })
  role: studyStatus;


  */
}

export enum studyStatus {
  recruiting = 'INACTIVE',
  progress = 'PROGRESS',
  evaluate = 'EVALUATE',
  complete = 'COMPLETE',
}
