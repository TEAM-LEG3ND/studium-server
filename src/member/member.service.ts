import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GetMemberResponseDto } from './dto/get-member-response.dto';
import { UpdateMemberResponseDto } from './dto/update-member-response.dto';
import { MemberStatus } from './dto/enums';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<GetMemberResponseDto[]> {
    const members = await this.prisma.member.findMany();
    return members.map((member) => GetMemberResponseDto.fromMember(member));
  }

  async findOne(id: number): Promise<GetMemberResponseDto> {
    const member = await this.prisma.member.findUnique({ where: { id } });
    return GetMemberResponseDto.fromMember(member);
  }

  async findStudyMembers(studyId: number): Promise<GetMemberResponseDto[]> {
    const members = await this.prisma.member.findMany({
      where: {
        studyId: studyId,
        NOT: {
          status: MemberStatus.pending,
        },
      },
    });
    return members.map((member) => GetMemberResponseDto.fromMember(member));
  }

  async findStudyPendingMembers(studyId: number): Promise<GetMemberResponseDto[]> {
    const members = await this.prisma.member.findMany({
      where: {
        studyId: studyId,
        status: MemberStatus.pending,
      },
    });
    return members.map((member) => GetMemberResponseDto.fromMember(member));
  }

  async updateMemberStatusToActive(id: number): Promise<UpdateMemberResponseDto> {
    const updatedMember = await this.prisma.member.update({
      where: { id },
      data: {
        status: MemberStatus.active,
      },
    });
    return UpdateMemberResponseDto.fromMember(updatedMember);
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<UpdateMemberResponseDto> {
    const { ...data } = updateMemberDto;

    const study = await this.prisma.member.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return UpdateMemberResponseDto.fromMember(study);
  }

  async remove(id: number) {
    return await this.prisma.member.delete({ where: { id } });
  }
}
