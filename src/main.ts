import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const configService: ConfigService = app.get(ConfigService);

  app.enableCors();
  const port = configService.get('SERVER_PORT');

  const options = new DocumentBuilder()
    .setTitle('Crackit Portfolio API')
    .setDescription('Crackit Portfolio API')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'accessToken',
    )
    .build();
  SwaggerModule.setup(
    'api-docs',
    app,
    SwaggerModule.createDocument(app, options),
  );

  Logger.log('');

  await app.listen(port);
}

bootstrap().then(
  () => {
    Logger.log('server is running on port 3003');
  },
  (e) => {
    Logger.error(`server running error ::: \n${e}\n`);
  },
);
