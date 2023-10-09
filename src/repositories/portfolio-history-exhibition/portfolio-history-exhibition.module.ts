import { Module } from '@nestjs/common';
import { PortfolioHistoryExhibitionService } from './portfolio-history-exhibition.service';
import { PortfolioHistoryExhibitionController } from './portfolio-history-exhibition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryExhibition, PortfolioHistoryExhibitionSubtitle, PortfolioHistoryExhibitionSubtitleValue } from './portfolio-history-exhibition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    PortfolioHistoryExhibition,
    PortfolioHistoryExhibitionSubtitle,
    PortfolioHistoryExhibitionSubtitleValue,
  ])],
  providers: [PortfolioHistoryExhibitionService],
  controllers: [PortfolioHistoryExhibitionController],
})
export class PortfolioHistoryExhibitionModule {}
