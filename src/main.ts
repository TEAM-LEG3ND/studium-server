import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { initSwaggerConfig } from './config/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.File({
          filename: `logs/error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
        }),

        new transports.File({
          filename: `logs/every.log`,
          format: format.combine(format.timestamp(), format.json()),
        }),

        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            })
          )
        })
      ]
    })
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, //ignore unknow properties
    forbidNonWhitelisted:true,
    transform:true,
  }));

  //api docs config
  initSwaggerConfig(app);

  await app.listen(3000);
}

bootstrap();
