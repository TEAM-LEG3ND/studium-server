import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initSwaggerConfig(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('title example')
    .setDescription('description example')
    .setVersion('1.0.0')
    .addServer('https://api.server.d0lim.com/studium')
    .addServer('http://localhost:3000')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
