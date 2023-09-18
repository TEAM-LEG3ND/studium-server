import { ApplyForm } from '@prisma/client';
import { CreateApplyFormResponseDto } from './create-apply-form-response.dto';
import { CreateAnswerResponseDto } from 'src/answer/dto/create-answer-response.dto';
import { CreateTimeFrameDto } from 'src/timeFrame/dto/create-timeframe.dto';

export class UpdateApplyFormResponseDto extends CreateApplyFormResponseDto {
  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    userId: number,
    studyId: number,
    answers: CreateAnswerResponseDto[],
    timeFrames: CreateTimeFrameDto[],
  ) {
    super(id, createdAt, updatedAt, userId, studyId, answers, timeFrames);
  }

  static fromApplyForm(applyform: ApplyForm) {
    return new CreateApplyFormResponseDto(
      applyform.id,
      applyform.createdAt,
      applyform.updatedAt,
      applyform.userId,
      applyform.studyId,
      applyform['answers'],
      applyform['timeFrames'],
    );
  }
}
