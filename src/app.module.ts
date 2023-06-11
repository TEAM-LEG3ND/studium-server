import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService  } from './app.service';
import { ApiModule } from './api/api.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ ApiModule, UserModule],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
