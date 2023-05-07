import { Injectable } from '@nestjs/common';
import {Prisma, RecruitArticle} from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RecruitArticleRepository {
    constructor(private prisma: PrismaService) {}

    async createRecruitArticle(params: {data:Prisma.RecruitArticleCreateInput}): Promise<RecruitArticle> {
        const {data} = params;
        return this.prisma.recruitArticle.create({data});
    }

    async getRecruitArticles(params: {
        skip?: number;
        take?: number;
        //cursor?: Prisma.RecruitArticleWhereInput;
        where?: Prisma.RecruitArticleWhereInput;
        orderBy?: Prisma.RecruitArticleOrderByWithRelationInput;
      }): Promise<RecruitArticle[]> {
        const { skip, take, where, orderBy } = params;
        return this.prisma.recruitArticle.findMany({ skip, take,  where, orderBy });
      }
}
