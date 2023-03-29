import { Module } from '@nestjs/common';
import { PortfolioHistoryAwardYearContentService } from './portfolio-history-award-year-content.service';
import { PortfolioHistoryAwardYearContentController } from './portfolio-history-award-year-content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryAwardYearContent } from './portfolio-history-award-year-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryAwardYearContent])],
  providers: [PortfolioHistoryAwardYearContentService],
  controllers: [PortfolioHistoryAwardYearContentController],
})
export class PortfolioHistoryAwardYearContentModule {}
