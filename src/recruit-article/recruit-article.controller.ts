import { Controller, Get ,Post ,Body, Param, Delete, Patch} from '@nestjs/common';
import { RecruitArticleService } from './recruit-article.service';
import { RecruitArticle } from './entities/recruit-article.entity';
import { CreateRecruitArticleDTO } from './dto/create-recruit-article.dto';
import { UpdateRecruitArticleDTO } from './dto/update-recruit-article.dto';

@Controller('recruit-article')
export class RecruitArticleController {

    constructor(private readonly recruitArticleService: RecruitArticleService) {}
    @Get()
    getAll() : RecruitArticle[]{
        return this.recruitArticleService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') articleId: number): RecruitArticle {
        return this.recruitArticleService.getOne(articleId);
    }

    @Post()
    create(@Body() articleData: CreateRecruitArticleDTO){
        return this.recruitArticleService.create(articleData);
    }

    @Delete(':id')
    remove(@Param('id') articleId: number) {
      return this.recruitArticleService.deleteOne(articleId);
    }

    @Patch(':id')
    patch(@Param('id') articleId: number, @Body() updateData: UpdateRecruitArticleDTO) {
      return this.recruitArticleService.update(articleId, updateData);
    }

}
