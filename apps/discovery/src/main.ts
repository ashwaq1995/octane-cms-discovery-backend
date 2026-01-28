import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DiscoveryModule } from './discovery.module';

async function bootstrap() {
  const app = await NestFactory.create(DiscoveryModule);

  // Global prefix for public APIs
  app.setGlobalPrefix('discovery');

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Discovery API')
    .setDescription('Public API for browsing and searching programs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}

bootstrap();
