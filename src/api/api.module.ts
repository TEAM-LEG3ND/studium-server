import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { ApiController } from './api.controller';

@Module({
  imports: [UserModule],
  controllers: [ApiController],
})
export class ApiModule {}
