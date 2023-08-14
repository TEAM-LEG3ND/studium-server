import { Controller, Get, Param } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { GetAnswerResponseDto } from './dto/get-answer-response.dto';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
  @Get()
  findAll(): Promise<GetAnswerResponseDto[]> {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetAnswerResponseDto> {
    return this.answerService.findOne(+id);
  }
}
