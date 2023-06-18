import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
@Injectable()
export class AppService {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  getHello(): string {
    this.logger.warn('hello world!');
    return 'Hello World!';
  }
}
