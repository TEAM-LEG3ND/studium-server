import { Module } from '@nestjs/common';
import { StudyService } from './study.service';
import { StudyController } from './study.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [StudyController],
  providers: [StudyService],
  imports: [PrismaModule],
})
export class StudyModule {}
