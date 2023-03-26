import { Module } from '@nestjs/common';
import { RecruitArticleController } from './recruit-article.controller';
import { RecruitArticleService } from './recruit-article.service';

@Module({
    controllers:[RecruitArticleController],
    providers:[RecruitArticleService],
})
export class RecruitArticleModule {}
