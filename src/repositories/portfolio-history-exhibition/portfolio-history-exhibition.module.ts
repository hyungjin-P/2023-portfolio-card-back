import { Module } from '@nestjs/common';
import { PortfolioHistoryExhibitionService } from './portfolio-history-exhibition.service';
import { PortfolioHistoryExhibitionController } from './portfolio-history-exhibition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryExhibition } from './portfolio-history-exhibition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryExhibition])],
  providers: [PortfolioHistoryExhibitionService],
  controllers: [PortfolioHistoryExhibitionController],
})
export class PortfolioHistoryExhibitionModule {}
