import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './configs/type-orm-config.service';
import { UserModule } from './repositories/user/user.module';
import { DataSource } from 'typeorm';
import { NowStage } from './enums/now.stage';
import { PortfolioModule } from './repositories/portfolio/portfolio.module';
import { PortfolioMainVisualModule } from './repositories/portfolio-main-visual/portfolio-main-visual.module';
import { PortfolioMainVisualThemeModule } from './repositories/portfolio-main-visual-theme/portfolio-main-visual-theme.module';
import { PortfolioMainVisualTagModule } from './repositories/portfolio-main-visual-tag/portfolio-main-visual-tag.module';
import { UserProfileModule } from './repositories/user-profile/user-profile.module';
import { FileModule } from './repositories/file/file.module';
import { PortfolioArtWorkModule } from './repositories/portfolio-art-work/portfolio-art-work.module';
import { PortfolioArtWorkBlockModule } from './repositories/portfolio-art-work-block/portfolio-art-work-block.module';
import { PortfolioArtWorkPictureModule } from './repositories/portfolio-art-work-picture/portfolio-art-work-picture.module';

const stage =
  process.env.NODE_ENV === 'production'
    ? NowStage.PRODUCTION
    : NowStage.DEVELOPMENT;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/.env.${stage}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    UserProfileModule,
    PortfolioModule,
    PortfolioMainVisualModule,
    PortfolioMainVisualThemeModule,
    PortfolioMainVisualTagModule,
    PortfolioArtWorkModule,
    PortfolioArtWorkBlockModule,
    PortfolioArtWorkPictureModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
