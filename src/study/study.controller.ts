import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudyService } from './study.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { CreateStudyResponseDto } from './dto/create-study-response.dto';
import { GetStudyResponseDto } from './dto/get-study-response.dto';
import { UpdateStudyResponseDto } from './dto/update-study-response.dto';
import { GetNoticeResponseDto } from 'src/notice/dto/get-notice-response.dto';
import { GetJournalResponseDto } from 'src/journal/dto/get-journal-response.dto';
import { GetUserResponseDto } from 'src/user/dto/get-user-response.dto';

@Controller()
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @Post()
  create(@Body() createStudyDto: CreateStudyDto): Promise<CreateStudyResponseDto> {
    return this.studyService.create(createStudyDto);
  }

  @Get()
  findAll(): Promise<GetStudyResponseDto[]> {
    return this.studyService.findAll();
  }

  @Get('on-fire')
  getStudiesOnFire(): Promise<GetStudyResponseDto[]> {
    return this.studyService.getStudiesOnFire();
  }

  @Get('sortTime')
  getStudiesSortByTime(): Promise<GetStudyResponseDto[]> {
    return this.studyService.getStudiesSortByTime();
  }

  @Get('sortViewCount')
  getStudiesSortByViewCount(): Promise<GetStudyResponseDto[]> {
    return this.studyService.getStudiesSortByViewCount();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetStudyResponseDto> {
    return this.studyService.findOne(+id);
  }

  @Get(':id')
  findPendingMembers(@Param('id') id: string): Promise<GetUserResponseDto[]> {
    return this.studyService.findPendingMembers(+id);
  }

  @Get(':id/notices')
  findNotices(@Param('id') id: string): Promise<GetNoticeResponseDto[]> {
    return this.studyService.findNotices(+id);
  }

  @Get(':id/notice')
  findNotice(@Param('id') id: string): Promise<GetNoticeResponseDto> {
    return this.studyService.findNotice(+id);
  }

  @Get(':id/journals')
  findJournals(@Param('id') id: string): Promise<GetJournalResponseDto[]> {
    return this.studyService.findJournals(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudyDto: UpdateStudyDto): Promise<UpdateStudyResponseDto> {
    return this.studyService.update(+id, updateStudyDto);
  }

  @Patch(':id/increment-views')
  incrementViewCount(@Param('id') id: string): Promise<UpdateStudyResponseDto> {
    return this.studyService.incrementViewCount(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyService.remove(+id);
  }

  @Get('tag/:tagName')
  getStudiesByTag(@Param('tagName') tagName: string): Promise<GetStudyResponseDto[]> {
    return this.studyService.getStudiesByTag(tagName);
  }
}
