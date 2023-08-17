import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [PrismaModule],
})
export class AnswerModule {}
