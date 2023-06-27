import { ApiProperty } from '@nestjs/swagger';

export class CreateStudyDto {
  @ApiProperty()
  leaderId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  intro: string;

  @ApiProperty({ type: [String] })
  rules: string[];

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  recruitStartDate: string;

  @ApiProperty()
  recruitEndDate: string;

  @ApiProperty()
  questionnaire: string;

  @ApiProperty({ required: false, enum: ['RECRUITING', 'PROGRESS', 'EVALUATE', 'COMPLETE'] })
  role: studyStatus;

  @ApiProperty({ required: false })
  recruiting: number;

  @ApiProperty({ required: false })
  recruited: number;

  @ApiProperty({ required: false })
  studyTemplate: string;
}

export enum studyStatus {
  recruiting = 'INACTIVE',
  progress = 'PROGRESS',
  evaluate = 'EVALUATE',
  complete = 'COMPLETE',
}
