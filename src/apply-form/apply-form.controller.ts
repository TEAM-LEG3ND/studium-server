import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApplyFormService } from './apply-form.service';
import { CreateApplyFormDto } from './dto/create-apply-form.dto';
import { GetApplyFormResponseDto } from './dto/get-apply-form-response.dto';
import { CreateApplyFormResponseDto } from './dto/create-apply-form-response.dto';
import { UpdateApplyFormDto } from './dto/update-apply-form.dto';
import { UpdateApplyFormResponseDto } from './dto/update-apply-form-response.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../config/swagger-config';

@Controller()
@ApiBearerAuth(ACCESS_TOKEN)
export class ApplyFormController {
  constructor(private readonly applyFormService: ApplyFormService) {}

  @Post()
  create(@Body() createApplyFormDto: CreateApplyFormDto): Promise<CreateApplyFormResponseDto> {
    return this.applyFormService.create(createApplyFormDto);
  }
  @Get()
  findAll(): Promise<GetApplyFormResponseDto[]> {
    return this.applyFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetApplyFormResponseDto> {
    return this.applyFormService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplyFormDto: UpdateApplyFormDto): Promise<UpdateApplyFormResponseDto> {
    return this.applyFormService.update(+id, updateApplyFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applyFormService.remove(+id);
  }
}
