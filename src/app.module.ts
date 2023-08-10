import { WarmupModule } from './common/warmup/warmup.module';
import { Module, Logger } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudyModule } from './study/study.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { InfraModule } from './infra/infra.module';
import { InternalUserModule } from './internal-user/internal-user.module';

@Module({
  imports: [
    InfraModule,
    InternalUserModule,
    UserModule,
    StudyModule,
    TagModule,
    WarmupModule,
    RouterModule.register([
      {
        path: 'internal/api/v1',
        module: InfraModule,
        children: [
          {
            path: 'user',
            module: InternalUserModule,
          },
        ],
      },
      {
        path: 'api/v1/user',
        module: UserModule,
      },
      {
        path: 'api/v1/study',
        module: StudyModule,
      },
      {
        path: 'api/v1/tag',
        module: TagModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
