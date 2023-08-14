import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { initSwaggerConfig } from './config/swagger-config';
import { initWinstonConfigInstance } from './config/winston-logger-config';
import { CommonExceptionFilter } from './common/common-exception-filter';

async function bootstrap() {
  const defaultLogger = WinstonModule.createLogger(initWinstonConfigInstance());

  const app = await NestFactory.create(AppModule, {
    logger: defaultLogger,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //ignore unknow properties
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new CommonExceptionFilter(app.get(HttpAdapterHost), defaultLogger));
  app.enableShutdownHooks();

  //api docs config
  initSwaggerConfig(app);

  await app.listen(3000);
}

bootstrap();
