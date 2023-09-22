import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const ACCESS_TOKEN = 'access-token';

export function initSwaggerConfig(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('title example')
    .setDescription('description example')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' }, ACCESS_TOKEN)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
