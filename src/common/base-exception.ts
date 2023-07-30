import { HttpException } from '@nestjs/common';

class BaseException extends HttpException {
  code: string;
}
