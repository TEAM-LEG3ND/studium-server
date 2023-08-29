import { ApiProperty } from '@nestjs/swagger';
import { Study } from '@prisma/client';
import { IsString, IsDate, IsNumber, IsArray } from 'class-validator';
import { CreateTagDto } from 'src/tag/dto/create-tag.dto';
import { Location, getLocationEnumValue } from './enums';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { GetUserResponseDto } from 'src/user/dto/get-user-response.dto';

export class CreateStudyResponseDto {
  @ApiProperty()
  @IsString()
  readonly id: number;

  @ApiProperty({ type: [GetUserResponseDto] })
  readonly leader: GetUserResponseDto;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

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
  @IsArray()
  readonly rules: string[];

  @ApiProperty()
  @IsDate()
  readonly startDate: Date;

  @ApiProperty()
  @IsDate()
  readonly endDate: Date;

  @ApiProperty()
  @IsString()
  readonly locationDetail: string;

  @ApiProperty({ required: false })
  @IsNumber()
  readonly total: number;

  @ApiProperty({ required: false })
  @IsNumber()
  readonly recruited: number;

  @ApiProperty({ required: false })
  @IsString()
  readonly templateContent: string;

  @ApiProperty({ required: false })
  @IsNumber()
  readonly viewCount: number;

  @ApiProperty({ type: [CreateTagDto], default: [] })
  readonly tags: CreateTagDto[];

  @ApiProperty()
  readonly location: Location;

  @ApiProperty({ type: [CreateQuestionDto], default: [] })
  readonly questions: CreateQuestionDto[];

  constructor(
    id: number,
    leader: GetUserResponseDto,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    recruitStartDate: Date,
    recruitEndDate: Date,
    intro: string,
    rules: string[],
    startDate: Date,
    endDate: Date,
    locationDetail: string,
    location: Location,
    total: number,
    recruited: number,
    templateContent: string,
    viewCount: number,
    tags: CreateTagDto[],
    questions: CreateQuestionDto[],
  ) {
    this.id = id;
    this.leader = leader;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.recruitStartDate = recruitStartDate;
    this.recruitEndDate = recruitEndDate;
    this.intro = intro;
    this.rules = rules;
    this.startDate = startDate;
    this.endDate = endDate;
    this.locationDetail = locationDetail;
    this.location = location;
    this.total = total;
    this.recruited = recruited;
    this.templateContent = templateContent;
    this.viewCount = viewCount;
    this.tags = tags;
    this.questions = questions;
  }

  static fromStudy(study: Study) {
    const location: Location = getLocationEnumValue(study.location);
    return new CreateStudyResponseDto(
      study.id,
      study['leader'],
      study.createdAt,
      study.updatedAt,
      study.name,
      study.recruitStartDate,
      study.recruitEndDate,
      study.intro,
      study.rules,
      study.startDate,
      study.endDate,
      study.locationDetail,
      location,
      study.total,
      study.recruited,
      study.templateContent,
      study.viewCount,
      study['tags'],
      study['questions'],
    );
  }
}
