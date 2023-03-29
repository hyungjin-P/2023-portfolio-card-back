import { Module } from '@nestjs/common';
import { PortfolioHistoryEducationYearContentController } from './portfolio-history-education-year-content.controller';
import { PortfolioHistoryEducationYearContentService } from './portfolio-history-education-year-content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryEducationYearContent } from './portfolio-history-education-year-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryEducationYearContent])],
  controllers: [PortfolioHistoryEducationYearContentController],
  providers: [PortfolioHistoryEducationYearContentService],
})
export class PortfolioHistoryEducationYearContentModule {}
