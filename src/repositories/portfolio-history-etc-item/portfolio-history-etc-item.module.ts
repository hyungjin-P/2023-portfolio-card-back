import { Module } from '@nestjs/common';
import { PortfolioHistoryEtcItemService } from './portfolio-history-etc-item.service';
import { PortfolioHistoryEtcItemController } from './portfolio-history-etc-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryEtcItem } from './portfolio-history-etc-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryEtcItem])],
  providers: [PortfolioHistoryEtcItemService],
  controllers: [PortfolioHistoryEtcItemController],
})
export class PortfolioHistoryEtcItemModule {}
