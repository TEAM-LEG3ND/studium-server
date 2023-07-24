import { PrismaModule } from 'src/database/prisma.module';
import { ApplyFormService } from './apply-form.service';
import { Module } from '@nestjs/common';
import { ApplyFormController } from './apply-form.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ApplyFormController],
  providers: [ApplyFormService],
})
export class ApplyFormModule {}
