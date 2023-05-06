import { Module } from '@nestjs/common';
import { RecruitArticleController } from './recruit-article.controller';
import { RecruitArticleService } from './recruit-article.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
    controllers:[RecruitArticleController, PrismaModule],
    providers:[RecruitArticleService],
})
export class RecruitArticleModule {}
