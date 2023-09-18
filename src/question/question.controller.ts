import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../config/swagger-config';

@Controller()
@ApiBearerAuth(ACCESS_TOKEN)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }
}
