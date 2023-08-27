import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [NoticeController],
  providers: [NoticeService],
  imports : [PrismaModule],
})
export class NoticeModule {}
