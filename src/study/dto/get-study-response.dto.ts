import { ApiProperty } from '@nestjs/swagger';
import { Study } from '@prisma/client';
import { IsString, IsDate, IsNumber, IsEnum } from 'class-validator';
import { GetTagResponseDto } from 'src/tag/dto/get-tag-response.dto';
import { Location, getLocationEnumValue } from './enums';

export class GetStudyResponseDto {
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

  @ApiProperty({ type: [GetTagResponseDto] })
  readonly tags: GetTagResponseDto[];

  @ApiProperty({
    enum: Location,
    description: 'Location of the study (ONLINE or OFFLINE)',
  })
  @IsEnum(Location)
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
    tags: GetTagResponseDto[],
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
    return new GetStudyResponseDto(
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
