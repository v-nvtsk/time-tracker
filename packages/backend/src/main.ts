import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const apiPrefix = configService.get<string>('platform.prefix')!;
  const frontOrigin = configService.get<string>('FRONT_ORIGIN')!;
  app.enableCors({
    origin: ['https://localhost:5173', frontOrigin || 'http://localhost:5173'],
  });

  app.setGlobalPrefix(apiPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .setTitle('Time Tracker API')
    .setDescription('The Time Tracker API specification')
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  });

  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'api-json',
  });

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      enableDebugMessages: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}
void bootstrap();
