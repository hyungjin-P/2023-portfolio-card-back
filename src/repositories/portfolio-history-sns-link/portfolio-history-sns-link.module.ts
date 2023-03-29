import { Module } from '@nestjs/common';
import { PortfolioHistorySnsLinkController } from './portfolio-history-sns-link.controller';
import { PortfolioHistorySnsLinkService } from './portfolio-history-sns-link.service';

@Module({
  controllers: [PortfolioHistorySnsLinkController],
  providers: [PortfolioHistorySnsLinkService]
})
export class PortfolioHistorySnsLinkModule {}
