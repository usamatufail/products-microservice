import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter, MongoExceptionFilter, MongooseException } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter(), new MongoExceptionFilter(), new MongooseException());

  const options = new DocumentBuilder()
    .setTitle('Product Catalogue API')
    .setDescription('An API for Catalogue Management')
    .setVersion('1.0')
    .addBearerAuth()
    .setBasePath('/api/v1')
    .build();
  const appDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, appDocument, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(3000);
}
bootstrap();
