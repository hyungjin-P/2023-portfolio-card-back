import { Module } from '@nestjs/common';
import { PortfolioHistoryEducationYearService } from './portfolio-history-education-year.service';
import { PortfolioHistoryEducationYearController } from './portfolio-history-education-year.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryEducationYear } from './portfolio-history-education-year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryEducationYear])],
  providers: [PortfolioHistoryEducationYearService],
  controllers: [PortfolioHistoryEducationYearController],
})
export class PortfolioHistoryEducationYearModule {}
