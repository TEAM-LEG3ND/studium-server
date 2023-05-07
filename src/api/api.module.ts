import { Module } from '@nestjs/common';
import { RecruitArticleModule } from 'src/recruit-article/recruit-article.module';
import { ApiController } from './api.controller';

@Module({
    imports: [RecruitArticleModule],
    controllers: [ApiController],
})
export class ApiModule {}
