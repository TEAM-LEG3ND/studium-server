import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudyService } from './study.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { CreateStudyResponseDto } from './dto/create-study-response.dto';
import { GetStudyResponseDto } from './dto/get-study-response.dto';
import { UpdateStudyResponseDto } from './dto/update-study-response.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetStudyResponseDto> {
    return this.studyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudyDto: UpdateStudyDto): Promise<UpdateStudyResponseDto> {
    return this.studyService.update(+id, updateStudyDto);
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
