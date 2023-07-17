import { Test, TestingModule } from '@nestjs/testing';
import { InternalUserService } from './internal-user.service';

describe('InternalUserService', () => {
  let service: InternalUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalUserService],
    }).compile();

    service = module.get<InternalUserService>(InternalUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
