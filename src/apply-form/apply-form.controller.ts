import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApplyFormService } from './apply-form.service';
import { CreateApplyFormDto } from './dto/create-apply-form.dto';
import { GetApplyFormResponseDto } from './dto/get-apply-form-response.dto';

@Controller()
export class ApplyFormController {
  constructor(private readonly applyFormService: ApplyFormService) {}

  @Post()
  create(@Body() createApplyFormDto: CreateApplyFormDto) {
    return this.applyFormService.create(createApplyFormDto);
  }

  @Get()
  findAll(): Promise<GetApplyFormResponseDto[]> {
    return this.applyFormService.findAll();
  }
}
