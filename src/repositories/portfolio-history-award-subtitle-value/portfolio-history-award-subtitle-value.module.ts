import { Module } from '@nestjs/common';
import { PortfolioHistoryAwardSubtitleValueService } from './portfolio-history-award-subtitle-value.service';
import { PortfolioHistoryAwardSubtitleValueController } from './portfolio-history-award-subtitle-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryAwardSubtitleValue } from './portfolio-history-award-subtitle-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryAwardSubtitleValue])],
  providers: [PortfolioHistoryAwardSubtitleValueService],
  controllers: [PortfolioHistoryAwardSubtitleValueController],
})
export class PortfolioHistoryAwardSubtitleValueModule {}
