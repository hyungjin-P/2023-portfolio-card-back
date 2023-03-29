import { Module } from '@nestjs/common';
import { PortfolioHistoryExhibitionYearController } from './portfolio-history-exhibition-year.controller';
import { PortfolioHistoryExhibitionYearService } from './portfolio-history-exhibition-year.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryExhibitionYear } from './portfolio-history-exhibition-year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryExhibitionYear])],
  controllers: [PortfolioHistoryExhibitionYearController],
  providers: [PortfolioHistoryExhibitionYearService],
})
export class PortfolioHistoryExhibitionYearModule {}
