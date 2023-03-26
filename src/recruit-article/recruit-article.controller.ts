import { Controller, Get ,Post ,Body} from '@nestjs/common';
import { RecruitArticleService } from './recruit-article.service';
import { RecruitArticle } from './entities/recruit-article.entity';
import { CreateRecruitArticleDTO } from './dto/create-recruit-article.dto';

@Controller('recruit-article')
export class RecruitArticleController {

    constructor(private readonly recruitArticleService: RecruitArticleService) {}
    @Get()
    getAll() : RecruitArticle[]{
        return this.recruitArticleService.getAll();
    }

    @Post()
    create(@Body() articleData: CreateRecruitArticleDTO){
        return this.recruitArticleService.create(articleData);
    }

}
