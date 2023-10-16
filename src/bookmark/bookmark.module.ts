import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService],
  imports: [PrismaModule],
})
export class BookmarkModule {}
