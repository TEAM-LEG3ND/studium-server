import { Injectable, NotFoundException } from '@nestjs/common';
import { RecruitArticle } from '@prisma/client'
import { RecruitArticleRepository } from './recruit-article.repository';

@Injectable()
export class RecruitArticleService {
    constructor(private repository: RecruitArticleRepository) {}


    async createRecruitArticle(
        params: { title: RecruitArticle[`title`];
        duration: RecruitArticle['duration'];
        recruiting: RecruitArticle['recruiting'];
        recruited: RecruitArticle['recruited'];
        content: RecruitArticle['content'];
        tags: RecruitArticle['tags']  }) {
        const { title,duration,recruiting,recruited,content,tags } = params;
    
        // call repository layer
        const recruitArticle = await this.repository.createRecruitArticle({
          data: {
            title,
            duration,
            recruiting,
            recruited,
            content,
            tags,
          },
        });
    
        // do other things in the service layer... e.g. send email of tweet
    
        return recruitArticle;
    }

    async getRecruitArticles() {
        const recruitArticles = await this.repository.getRecruitArticles({});
        return recruitArticles;
      }
}
