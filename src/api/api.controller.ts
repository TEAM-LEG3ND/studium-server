import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecruitArticleService } from 'src/recruit-article/recruit-article.service';

@Controller('api')
export class ApiController {
    constructor(private readonly recruitArticleService: RecruitArticleService) {}

    @Post(`recruit-article`)
    async createRecruitArticle(@Body() data: {  title: string; duration: string; recruiting: number; recruited: number; content: any; tags: string[];  }) {
        const { title, duration, recruiting, recruited, content, tags } = data;
        return this.recruitArticleService.createRecruitArticle({
        title,
        duration,
        recruiting,
        recruited,
        content,
        tags,
        });
    }

    @Get('recruit-article')
    getRecruitArticles(){
        return this.recruitArticleService.getRecruitArticles();
    }


}