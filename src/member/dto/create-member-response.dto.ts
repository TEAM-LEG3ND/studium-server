import { ApiProperty } from '@nestjs/swagger';
import { Member } from '@prisma/client';
import { MemberStatus, MemberType } from './enums';

export class CreateMemberResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly studyId: number;

  @ApiProperty()
  readonly status: MemberStatus;

  @ApiProperty()
  readonly type: MemberType;

  constructor(id: number, userId: number, studyId: number, status: MemberStatus, type: MemberType) {
    this.id = id;
    this.userId = userId;
    this.studyId = studyId;
    this.status = status;
    this.type = type;
  }

  static fromMember(member: Member) {
    return new CreateMemberResponseDto(
      member.id,
      member.userId,
      member.studyId,
      member.status as MemberStatus,
      member.type as MemberType,
    );
  }
}
