import { Injectable } from '@nestjs/common';
import { RecruitArticle } from './entities/recruit-article.entity';
@Injectable()
export class RecruitArticleService {
    private articles: RecruitArticle[] = [];

    getAll(): RecruitArticle[] {
        return this.articles;
    }
}
