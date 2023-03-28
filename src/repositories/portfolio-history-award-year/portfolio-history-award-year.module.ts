import { Module } from '@nestjs/common';
import { PortfolioHistoryAwardYearService } from './portfolio-history-award-year.service';
import { PortfolioHistoryAwardYearController } from './portfolio-history-award-year.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryAwardYear } from './portfolio-history-award-year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryAwardYear])],
  providers: [PortfolioHistoryAwardYearService],
  controllers: [PortfolioHistoryAwardYearController],
})
export class PortfolioHistoryAwardYearModule {}
