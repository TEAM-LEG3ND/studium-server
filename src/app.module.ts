import { Module, Logger } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudyModule } from './study/study.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    RouterModule.register([
      {
        path: 'user',
        module: UserModule,
      }
    ]),
    StudyModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
