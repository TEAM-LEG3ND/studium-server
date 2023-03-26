import { Test, TestingModule } from '@nestjs/testing';
import { RecruitArticleService } from './recruit-article.service';

describe('RecruitArticleService', () => {
  let service: RecruitArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecruitArticleService],
    }).compile();

    service = module.get<RecruitArticleService>(RecruitArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
