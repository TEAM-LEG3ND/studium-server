import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [JournalController],
  providers: [JournalService],
  imports: [PrismaModule],
})
export class JournalModule {}
