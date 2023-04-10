import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruitArticleDTO } from './create-recruit-article.dto';

export class UpdateRecruitArticleDTO extends PartialType(CreateRecruitArticleDTO) {}