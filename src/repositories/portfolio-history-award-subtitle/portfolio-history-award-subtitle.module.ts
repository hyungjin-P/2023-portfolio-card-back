import { Module } from '@nestjs/common';
import { PortfolioHistoryAwardSubtitleService } from './portfolio-history-award-subtitle.service';
import { PortfolioHistoryAwardSubtitleController } from './portfolio-history-award-subtitle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryAwardSubtitle } from './portfolio-history-award-subtitle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryAwardSubtitle])],
  providers: [PortfolioHistoryAwardSubtitleService],
  controllers: [PortfolioHistoryAwardSubtitleController],
})
export class PortfolioHistoryAwardSubtitleModule {}
