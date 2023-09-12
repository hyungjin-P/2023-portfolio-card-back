import { Module } from '@nestjs/common';
import { PortfolioHistoryEducationController } from './portfolio-history-education.controller';
import { PortfolioHistoryEducationService } from './portfolio-history-education.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PortfolioHistoryEducation,
  PortfolioHistoryEducationSubtitle,
  PortfolioHistoryEducationSubtitleValue
} from "./portfolio-history-education.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PortfolioHistoryEducation,
      PortfolioHistoryEducationSubtitle,
      PortfolioHistoryEducationSubtitleValue,
    ]),
  ],
  controllers: [PortfolioHistoryEducationController],
  providers: [PortfolioHistoryEducationService],
})
export class PortfolioHistoryEducationModule {}
