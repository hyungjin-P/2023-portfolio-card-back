import { Module } from '@nestjs/common';
import { PortfolioHistoryGeneralService } from './portfolio-history-general.service';
import { PortfolioHistoryGeneralController } from './portfolio-history-general.controller';

@Module({
  providers: [PortfolioHistoryGeneralService],
  controllers: [PortfolioHistoryGeneralController]
})
export class PortfolioHistoryGeneralModule {}
