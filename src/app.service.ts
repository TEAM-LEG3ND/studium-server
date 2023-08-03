import { BadRequestException, Inject, Injectable, LoggerService } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { StudiumException } from './common/studium-exception';

@Injectable()
export class AppService {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  getHello(): string {
    // throw new BadRequestException(StudiumException.test);
    return 'Hello Studium!';
  }
}
