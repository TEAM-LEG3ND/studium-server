import { ApiProperty } from '@nestjs/swagger';
import { MemberStatus, MemberType } from './enums';

export class CreateMemberDto {
  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly studyId: number;

  @ApiProperty()
  readonly status: MemberStatus;

  @ApiProperty()
  readonly type: MemberType;
}
