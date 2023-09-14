import { ApiProperty } from '@nestjs/swagger';
import { MemberStatus, MemberType } from './enums';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly status: MemberStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly type: MemberType;
}
