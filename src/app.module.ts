import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

enum Stage {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

const stage = Stage.DEVELOPMENT;
// const stage = Stage.PRODUCTION;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/.env.${stage}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
