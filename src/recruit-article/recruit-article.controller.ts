import { Controller, Get } from '@nestjs/common';
import { RecruitArticleService } from './recruit-article.service';
import { RecruitArticle } from './entities/recruit-article.entity';


@Controller('recruit-article')
export class RecruitArticleController {

    constructor(private readonly recruitArticleService: RecruitArticleService) {}
    @Get()
    getAll() : RecruitArticle[]{
        return this.recruitArticleService.getAll();
    }

}
