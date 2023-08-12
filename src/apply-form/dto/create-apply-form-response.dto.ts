import { ApiProperty } from '@nestjs/swagger';
import { ApplyForm } from '@prisma/client';
import { IsString, IsNumber } from 'class-validator';
export class CreateApplyFormResponseDto {
  @ApiProperty()
  @IsString()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsNumber()
  readonly studyId: number;

  constructor(id: number, createdAt: Date, updatedAt: Date, userId: number, studyId: number) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
    this.studyId = studyId;
  }

  static fromApplyForm(applyform: ApplyForm) {
    return new CreateApplyFormResponseDto(
      applyform.id,
      applyform.createdAt,
      applyform.updatedAt,
      applyform.userId,
      applyform.studyId,
    );
  }
}
