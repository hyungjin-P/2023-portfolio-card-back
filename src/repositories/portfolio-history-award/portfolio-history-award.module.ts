import { Module } from '@nestjs/common';
import { PortfolioHistoryAwardController } from './portfolio-history-award.controller';
import { PortfolioHistoryAwardService } from './portfolio-history-award.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PortfolioHistoryAward,
  PortfolioHistoryAwardSubtitle,
  PortfolioHistoryAwardSubtitleValue
} from "./portfolio-history-award.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryAward,
    PortfolioHistoryAwardSubtitle,
    PortfolioHistoryAwardSubtitleValue,
  ])],
  controllers: [PortfolioHistoryAwardController],
  providers: [PortfolioHistoryAwardService],
})
export class PortfolioHistoryAwardModule {}
