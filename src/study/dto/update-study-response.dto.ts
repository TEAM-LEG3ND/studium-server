import { CreateStudyResponseDto } from './create-study-response.dto';
import { UpdateStudyDto } from './update-study.dto';

export class UpdateStudyResponseDto extends UpdateStudyDto {
  // You can add additional properties specific to the response, if needed.
  // For example, a message or status code, but they are optional.

  // constructor is optional if the superclass already has one that sets the properties
  constructor(partial: Partial<CreateStudyResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
