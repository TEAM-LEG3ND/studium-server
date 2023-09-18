import { ApiProperty } from '@nestjs/swagger';
import { MemberStatus, MemberType } from './enums';
import { Member } from '@prisma/client';

export class GetMemberResponseDto {
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

  @ApiProperty()
  readonly start: Date;

  @ApiProperty()
  readonly end: Date;

  constructor(id: number, userId: number, studyId: number, status: MemberStatus, type: MemberType) {
    this.id = id;
    this.userId = userId;
    this.studyId = studyId;
    this.status = status;
    this.type = type;
  }

  static fromMember(member: Member) {
    return new GetMemberResponseDto(
      member.id,
      member.userId,
      member.studyId,
      member.status as MemberStatus,
      member.type as MemberType,
    );
  }
}
