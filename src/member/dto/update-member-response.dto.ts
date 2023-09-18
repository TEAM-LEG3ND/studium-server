import { Member } from '@prisma/client';
import { CreateMemberResponseDto } from './create-member-response.dto';
import { MemberStatus, MemberType } from './enums';

export class UpdateMemberResponseDto extends CreateMemberResponseDto {
  constructor(id: number, userId: number, studyId: number, status: MemberStatus, type: MemberType) {
    super(id, userId, studyId, status, type);
  }

  static fromMember(member: Member) {
    return new UpdateMemberResponseDto(
      member.id,
      member.userId,
      member.studyId,
      member.status as MemberStatus,
      member.type as MemberType,
    );
  }
}
