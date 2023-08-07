import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports: [PrismaModule],
})
export class TagModule {}
