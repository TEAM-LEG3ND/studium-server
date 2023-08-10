import { ApiProperty } from '@nestjs/swagger';
import { Study } from '@prisma/client';
import { IsString, IsDate, IsNumber } from 'class-validator';
import { CreateTagDto } from 'src/tag/dto/create-tag.dto';

export class CreateStudyResponseDto {
  @ApiProperty()
  @IsString()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsDate()
  readonly recruitStartDate: Date;

  @ApiProperty()
  @IsDate()
  readonly recruitEndDate: Date;

  @ApiProperty()
  @IsString()
  readonly intro: string;

  @ApiProperty()
  @IsDate()
  readonly startDate: Date;

  @ApiProperty()
  @IsDate()
  readonly endDate: Date;

  @ApiProperty()
  @IsString()
  readonly location: string;

  @ApiProperty({ required: false })
  @IsNumber()
  readonly recruiting: number;

  @ApiProperty({ required: false })
  @IsNumber()
  readonly recruited: number;

  @ApiProperty({ required: false })
  @IsString()
  readonly studyTemplate: string;

  @ApiProperty({ type: [CreateTagDto], default: [] })
  readonly tags: CreateTagDto[];

  constructor(id: number, title: string, name: string, recruitStartDate: Date, recruitEndDate: Date, intro: string, startDate: Date, endDate: Date,
      location: string, recruiting: number, recruited: number, studyTemplate: string, tags: CreateTagDto[]) {
    this.id = id;
    this.title = title;
    this.name = name;
    this.recruitStartDate = recruitStartDate;
    this.recruitEndDate = recruitEndDate;
    this.intro = intro;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.recruiting = recruiting;
    this.recruited = recruited;
    this.studyTemplate = studyTemplate;
    this.tags = tags;
  }

  static fromStudy(study: Study) {
    return new CreateStudyResponseDto(
      study.id,
      study.title,
      study.name,
      study.recruitStartDate,
      study.recruitEndDate,
      study.intro,
      study.startDate,
      study.endDate,
      study.location,
      study.recruiting,
      study.recruited,
      study.studyTemplate,
      study['tags']
    );
  }
}
