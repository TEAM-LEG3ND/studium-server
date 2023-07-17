import { Module } from '@nestjs/common';
import { InternalUserController } from './internal-user.controller';
import { InternalUserService } from './internal-user.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InternalUserController],
  providers: [InternalUserService]
})
export class InternalUserModule {}
