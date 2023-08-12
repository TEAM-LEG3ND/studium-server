import { PartialType } from '@nestjs/swagger';
import { CreateStudyDto } from './create-study.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudyDto extends PartialType(CreateStudyDto) {}
