import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { TimeFrameController } from './timeframe.controller';
import { TimeFrameService } from './timeframe.service';
@Module({
  controllers: [TimeFrameController],
  providers: [TimeFrameService],
  imports: [PrismaModule],
})
export class TimeFrameModule {}
