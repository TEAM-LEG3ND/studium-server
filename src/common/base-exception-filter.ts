import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from 'winston';

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost, private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    this.logger.error(exception['message']);

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    httpAdapter.reply(ctx.getResponse(), exception['response'], httpStatus);
  }
}
