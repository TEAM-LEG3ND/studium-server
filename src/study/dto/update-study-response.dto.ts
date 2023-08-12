import { CreateTagDto } from 'src/tag/dto/create-tag.dto';
import { CreateStudyResponseDto } from './create-study-response.dto';
import { Study } from '@prisma/client';
import { Location, getLocationEnumValue } from './enums';

export class UpdateStudyResponseDto extends CreateStudyResponseDto {
  // You can add additional properties specific to the response, if needed.
  // For example, a message or status code, but they are optional.

  // constructor is optional if the superclass already has one that sets the properties
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
    super(
      id,
      name,
      recruitStartDate,
      recruitEndDate,
      intro,
      startDate,
      endDate,
      locationDetail,
      location,
      total,
      recruited,
      templateContent,
      tags,
    );
  }

  static fromStudy(study: Study) {
    const location: Location = getLocationEnumValue(study.location);
    return new UpdateStudyResponseDto(
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
