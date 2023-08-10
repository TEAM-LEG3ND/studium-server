import { CreateTagDto } from 'src/tag/dto/create-tag.dto';
import { CreateStudyResponseDto } from './create-study-response.dto';
import { Study } from '@prisma/client';

export class UpdateStudyResponseDto extends CreateStudyResponseDto {
  // You can add additional properties specific to the response, if needed.
  // For example, a message or status code, but they are optional.

  // constructor is optional if the superclass already has one that sets the properties
  constructor(id: number, title: string, name: string, recruitStartDate: Date, recruitEndDate: Date, intro: string, startDate: Date, endDate: Date,
    location: string, recruiting: number, recruited: number, studyTemplate: string, tags: CreateTagDto[]) {
    super(id, title, name, recruitStartDate, recruitEndDate, intro, startDate, endDate, location, recruiting, recruited, studyTemplate, tags);
  }

  static fromStudy(study: Study) {
    return new UpdateStudyResponseDto(
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