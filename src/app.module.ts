import { Module, Logger } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudyModule } from './study/study.module';

@Module({
  imports: [
    RouterModule.register([
      // {
      //   path: 'sample-path',
      //   module: SampleModule,
      // }
    ]),
    StudyModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
