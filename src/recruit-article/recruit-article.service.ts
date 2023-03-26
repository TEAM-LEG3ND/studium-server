import { Injectable } from '@nestjs/common';
import { RecruitArticle } from './entities/recruit-article.entity';
import { CreateRecruitArticleDTO } from './dto/create-recruit-article.dto';
@Injectable()
export class RecruitArticleService {
    private articles: RecruitArticle[] = [];

    getAll(): RecruitArticle[] {
        return this.articles;
    }
    create(articleData: CreateRecruitArticleDTO){
        this.articles.push({
            id:this.articles.length + 1,
            ...articleData,
        });
    }
}
