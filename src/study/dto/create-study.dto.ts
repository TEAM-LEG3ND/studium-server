import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateStudyDto {
  @IsOptional()
  @ApiProperty()
  readonly title;

  @IsOptional()
  @ApiProperty()
  readonly name;

  @IsOptional()
  @ApiProperty()
  readonly recruitStartDate;

  @IsOptional()
  @ApiProperty()
  readonly recruitEndDate;

  @IsOptional()
  @ApiProperty()
  readonly intro;

  @IsOptional()
  @ApiProperty()
  readonly startDate;

  @IsOptional()
  @ApiProperty()
  readonly endDate;

  @IsOptional()
  @ApiProperty()
  readonly location;

  @IsOptional()
  @ApiProperty({ required: false })
  readonly recruiting;

  @IsOptional()
  @ApiProperty({ required: false })
  readonly recruited;

  @IsOptional()
  @ApiProperty({ required: false })
  readonly studyTemplate;

  @IsOptional()
  @ApiProperty()
  readonly questionnaire;



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
