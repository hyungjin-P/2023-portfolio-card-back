import { Module } from '@nestjs/common';
import { PortfolioHistoryExhibitionYearContentService } from './portfolio-history-exhibition-year-content.service';
import { PortfolioHistoryExhibitionYearContentController } from './portfolio-history-exhibition-year-content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryExhibitionYearContent } from './portfolio-history-exhibition-year-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryExhibitionYearContent])],
  providers: [PortfolioHistoryExhibitionYearContentService],
  controllers: [PortfolioHistoryExhibitionYearContentController],
})
export class PortfolioHistoryExhibitionYearContentModule {}
