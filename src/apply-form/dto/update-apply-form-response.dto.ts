import { ApplyForm, Study } from '@prisma/client';
import { CreateApplyFormResponseDto } from './create-apply-form-response.dto';
import { CreateAnswerResponseDto } from 'src/answer/dto/create-answer-response.dto';

export class UpdateApplyFormResponseDto extends CreateApplyFormResponseDto {
  // You can add additional properties specific to the response, if needed.
  // For example, a message or status code, but they are optional.

  // constructor is optional if the superclass already has one that sets the properties

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    userId: number,
    studyId: number,
    answers: CreateAnswerResponseDto[],
  ) {
    super(id, createdAt, updatedAt, userId, studyId, answers);
  }

  static fromApplyForm(applyform: ApplyForm) {
    return new CreateApplyFormResponseDto(
      applyform.id,
      applyform.createdAt,
      applyform.updatedAt,
      applyform.userId,
      applyform.studyId,
      applyform['answers'],
    );
  }
}
