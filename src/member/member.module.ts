import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [PrismaModule],
})
export class MemberModule {}
