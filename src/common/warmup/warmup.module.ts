import { Module } from '@nestjs/common';
import { WarmupService } from './warmup.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [WarmupService],
})
export class WarmupModule {}
