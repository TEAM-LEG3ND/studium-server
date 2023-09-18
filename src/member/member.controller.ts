import { GetMemberResponseDto } from './dto/get-member-response.dto';
import { UpdateMemberResponseDto } from './dto/update-member-response.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberService } from './member.service';
import { Controller, Get, Param, Patch, Body, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiOperation({
    description: 'Retrieve a list of all members.',
  })
  findAll(): Promise<GetMemberResponseDto[]> {
    return this.memberService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Retrieve individual member by their member ID.',
  })
  findOne(@Param('id') id: string): Promise<GetMemberResponseDto> {
    return this.memberService.findOne(+id);
  }

  @Get('study/:id')
  @ApiOperation({
    description: 'Retrieve members using study ID.',
  })
  findStudyMembers(@Param('id') id: string): Promise<GetMemberResponseDto[]> {
    return this.memberService.findStudyMembers(+id);
  }

  @Get('study/pending/:id')
  @ApiOperation({
    description: 'Retrieve pending members using study ID.',
  })
  findStudyPendingMembers(@Param('id') id: string): Promise<GetMemberResponseDto[]> {
    return this.memberService.findStudyPendingMembers(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto): Promise<UpdateMemberResponseDto> {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Patch('activate/:id')
  @ApiOperation({
    description: 'Update Member status to ACTIVE.',
  })
  updateMemberStatusToActive(@Param('id') id: string): Promise<UpdateMemberResponseDto> {
    return this.memberService.updateMemberStatusToActive(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
