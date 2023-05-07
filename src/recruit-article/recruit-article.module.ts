import { Module } from '@nestjs/common';
import { RecruitArticleService } from './recruit-article.service';
import { PrismaModule } from 'src/database/prisma.module';
import { RecruitArticleRepository } from './recruit-article.repository';

@Module({
    imports:[PrismaModule],
    providers:[RecruitArticleRepository, RecruitArticleService],
    exports:[RecruitArticleService],
})
export class RecruitArticleModule {}
