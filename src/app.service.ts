import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { UniversalAccountId } from './common/account/universal-account-id.decorator';

@Injectable()
export class AppService {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  getHello(accountId: UniversalAccountId): string {
    return `Hello Studium! and Hello user with id ${accountId}`;
  }
}
