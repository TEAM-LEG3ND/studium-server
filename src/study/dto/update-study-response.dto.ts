import { CreateTagDto } from 'src/tag/dto/create-tag.dto';
import { CreateStudyResponseDto } from './create-study-response.dto';
import { Study } from '@prisma/client';
import { Location, getLocationEnumValue } from './enums';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { GetQuestionResponseDto } from 'src/question/dto/get-question-response.dto';
import { GetUserResponseDto } from 'src/user/dto/get-user-response.dto';

export class UpdateStudyResponseDto extends CreateStudyResponseDto {
  // You can add additional properties specific to the response, if needed.
  // For example, a message or status code, but they are optional.

  // constructor is optional if the superclass already has one that sets the properties
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
    questions: GetQuestionResponseDto[],
  ) {
    super(
      id,
      leader,
      createdAt,
      updatedAt,
      name,
      recruitStartDate,
      recruitEndDate,
      intro,
      rules,
      startDate,
      endDate,
      locationDetail,
      location,
      total,
      recruited,
      templateContent,
      viewCount,
      tags,
      questions,
    );
  }

  static fromStudy(study: Study) {
    const location: Location = getLocationEnumValue(study.location);
    return new UpdateStudyResponseDto(
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
