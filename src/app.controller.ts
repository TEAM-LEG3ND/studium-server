import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UniversalAccountId, UniversalAccountIdHeader } from './common/account/universal-account-id.decorator';
import { SwaggerUniversalAccountId } from './config/decorator/swagger-universal-account-id.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ACCESS_TOKEN } from './config/swagger-config';

@Controller()
@ApiBearerAuth(ACCESS_TOKEN)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SwaggerUniversalAccountId()
  getHello(@UniversalAccountIdHeader() accountId: UniversalAccountId): string {
    return this.appService.getHello(accountId);
  }
}
