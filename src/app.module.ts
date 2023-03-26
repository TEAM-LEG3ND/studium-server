import { Module } from '@nestjs/common';
import { RecruitArticleModule } from './recruit-article/recruit-article.module';
import { AppController } from './app.controller';
import { AppService  } from './app.service';

@Module({
  imports: [RecruitArticleModule],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
