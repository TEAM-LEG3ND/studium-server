import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { initSwaggerConfig } from './config/swagger-config';
import { initWinstonConfigInstance } from './config/winston-logger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(initWinstonConfigInstance()),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //ignore unknow properties
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //api docs config
  initSwaggerConfig(app);

  await app.listen(3000);
}

bootstrap();
