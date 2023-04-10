import { Injectable, NotFoundException } from '@nestjs/common';
import { RecruitArticle } from './entities/recruit-article.entity';
import { CreateRecruitArticleDTO } from './dto/create-recruit-article.dto';
import { UpdateRecruitArticleDTO } from './dto/update-recruit-article.dto';
@Injectable()
export class RecruitArticleService {
    private articles: RecruitArticle[] = [];

    getAll(): RecruitArticle[] {
        return this.articles;
    }
    getOne(id: number): RecruitArticle {
        const article = this.articles.find(article => article.id === id);
        if (!article) {
          throw new NotFoundException(`Article with ID ${id} not found.`);
        }
        return article;
    }

    create(articleData: CreateRecruitArticleDTO){
        this.articles.push({
            id:this.articles.length + 1,
            ...articleData,
        });
    }
    deleteOne(id: number) {
        this.getOne(id);
        this.articles = this.articles.filter(article => article.id !== id);
    }

    update(id: number, updateData: UpdateRecruitArticleDTO) {
        const article = this.getOne(id);
        this.deleteOne(id);
        this.articles.push({ ...article, ...updateData });
      }
}
