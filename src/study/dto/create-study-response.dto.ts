import { ApiProperty } from '@nestjs/swagger';
import { Study } from '@prisma/client';
import { IsString, IsDate, IsNumber } from 'class-validator';
import { CreateTagDto } from 'src/tag/dto/create-tag.dto';
import { Location, getLocationEnumValue } from './enums';

export class CreateStudyResponseDto {
  @ApiProperty()
  @IsString()
  readonly id: number;

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

  @ApiProperty({ type: [CreateTagDto], default: [] })
  readonly tags: CreateTagDto[];

  @ApiProperty()
  readonly location: Location;

  constructor(
    id: number,
    name: string,
    recruitStartDate: Date,
    recruitEndDate: Date,
    intro: string,
    startDate: Date,
    endDate: Date,
    locationDetail: string,
    location: Location,
    total: number,
    recruited: number,
    templateContent: string,
    tags: CreateTagDto[],
  ) {
    this.id = id;
    this.name = name;
    this.recruitStartDate = recruitStartDate;
    this.recruitEndDate = recruitEndDate;
    this.intro = intro;
    this.startDate = startDate;
    this.endDate = endDate;
    this.locationDetail = locationDetail;
    this.location = location;
    this.total = total;
    this.recruited = recruited;
    this.templateContent = templateContent;
    this.tags = tags;
  }

  static fromStudy(study: Study) {
    const location: Location = getLocationEnumValue(study.location);
    return new CreateStudyResponseDto(
      study.id,
      study.name,
      study.recruitStartDate,
      study.recruitEndDate,
      study.intro,
      study.startDate,
      study.endDate,
      study.locationDetail,
      location,
      study.total,
      study.recruited,
      study.templateContent,
      study['tags'],
    );
  }
}
