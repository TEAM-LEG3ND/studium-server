import { ValidationPipe, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

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

function initSwaggerConfig(app: INestApplication): void {
  const config = new DocumentBuilder()
  .setTitle('title example')
  .setDescription('description example')
  .setVersion('1.0.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}

bootstrap();
