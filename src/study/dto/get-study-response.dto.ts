import { ApiProperty } from '@nestjs/swagger';
import { Study } from '@prisma/client';
import { IsString, IsDate, IsNumber, IsEnum, IsArray } from 'class-validator';
import { GetTagResponseDto } from 'src/tag/dto/get-tag-response.dto';
import { Location, getLocationEnumValue } from './enums';
import { GetQuestionResponseDto } from 'src/question/dto/get-question-response.dto';
import { GetUserResponseDto } from 'src/user/dto/get-user-response.dto';

export class GetStudyResponseDto {
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

  @ApiProperty({ type: [GetTagResponseDto] })
  readonly tags: GetTagResponseDto[];

  @ApiProperty({ enum: Location })
  @IsEnum(Location)
  readonly location: Location;

  @ApiProperty({ type: [GetQuestionResponseDto] })
  readonly questions: GetQuestionResponseDto[];

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
    tags: GetTagResponseDto[],
    questions: GetQuestionResponseDto[],
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
    return new GetStudyResponseDto(
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
