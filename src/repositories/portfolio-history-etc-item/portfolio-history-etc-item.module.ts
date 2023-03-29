import { Module } from '@nestjs/common';
import { PortfolioHistoryEtcItemService } from './portfolio-history-etc-item.service';
import { PortfolioHistoryEtcItemController } from './portfolio-history-etc-item.controller';

@Module({
  providers: [PortfolioHistoryEtcItemService],
  controllers: [PortfolioHistoryEtcItemController]
})
export class PortfolioHistoryEtcItemModule {}
