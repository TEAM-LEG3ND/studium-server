import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [PrismaModule],
})
export class QuestionModule {}
