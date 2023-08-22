import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TypeOrmConfigService } from './configs/type-orm-config.service';
import { AuthorModule } from './repositories/author/author.module';
import { NowStage } from './enums/now.stage';
import { PortfolioModule } from './repositories/portfolio/portfolio.module';
import { PortfolioMainVisualModule } from './repositories/portfolio-main-visual/portfolio-main-visual.module';
import { PortfolioMainVisualThemeModule } from './repositories/portfolio-main-visual-theme/portfolio-main-visual-theme.module';
import { PortfolioMainVisualTagModule } from './repositories/portfolio-main-visual-tag/portfolio-main-visual-tag.module';
import { FileModule } from './repositories/file/file.module';
import { PortfolioArtWorkModule } from './repositories/portfolio-art-work/portfolio-art-work.module';
import { PortfolioArtWorkBlockModule } from './repositories/portfolio-art-work-block/portfolio-art-work-block.module';
import { PortfolioArtWorkPictureModule } from './repositories/portfolio-art-work-picture/portfolio-art-work-picture.module';
import { PortfolioHistoryModule } from './repositories/portfolio-history/portfolio-history.module';
import { PortfolioHistoryAwardModule } from './repositories/portfolio-history-award/portfolio-history-award.module';
import { PortfolioHistoryAwardYearModule } from './repositories/portfolio-history-award-year/portfolio-history-award-year.module';
import { PortfolioHistoryAwardYearContentModule } from './repositories/portfolio-history-award-year-content/portfolio-history-award-year-content.module';
import {
  PortfolioHistoryExhibitionModule
} from './repositories/portfolio-history-exhibition/portfolio-history-exhibition.module';
import {
  PortfolioHistoryExhibitionYearModule
} from './repositories/portfolio-history-exhibition-year/portfolio-history-exhibition-year.module';
import {
  PortfolioHistoryExhibitionYearContentModule
} from './repositories/portfolio-history-exhibition-year-content/portfolio-history-exhibition-year-content.module';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { join } from "path";
import {
  PortfolioHistoryGeneralModule
} from "./repositories/portfolio-history-general/portfolio-history-general.module";
import {
  PortfolioHistoryContactModule
} from "./repositories/portfolio-history-contact/portfolio-history-contact.module";

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
    AuthorModule,
    PortfolioModule,
    PortfolioMainVisualModule,
    PortfolioMainVisualThemeModule,
    PortfolioMainVisualTagModule,
    PortfolioArtWorkModule,
    PortfolioArtWorkBlockModule,
    PortfolioArtWorkPictureModule,
    PortfolioHistoryModule,
    PortfolioHistoryGeneralModule,
    PortfolioHistoryContactModule,
    PortfolioHistoryAwardModule,
    PortfolioHistoryAwardYearModule,
    PortfolioHistoryAwardYearContentModule,
    PortfolioHistoryExhibitionModule,
    PortfolioHistoryExhibitionYearModule,
    PortfolioHistoryExhibitionYearContentModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
