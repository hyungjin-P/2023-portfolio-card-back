import { Module } from '@nestjs/common';
import { PortfolioHistoryEtcController } from './portfolio-history-etc.controller';
import { PortfolioHistoryEtcService } from './portfolio-history-etc.service';

@Module({
  controllers: [PortfolioHistoryEtcController],
  providers: [PortfolioHistoryEtcService]
})
export class PortfolioHistoryEtcModule {}
