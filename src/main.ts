import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

let runningPort = 3000;

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.enableCors();

  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('SERVER_PORT');

  runningPort = port;

  /* swagger */
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

  /* hot reload */
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(port);
}

bootstrap().then(
  () => {
    Logger.log(`server running on port ${runningPort}`);
  },
  (e) => {
    Logger.error(`server running error ::: \n${e}\n`);
  },
);
