import { Module } from '@nestjs/common';
import { PortfolioHistoryEtcController } from './portfolio-history-etc.controller';
import { PortfolioHistoryEtcService } from './portfolio-history-etc.service';
import {
  PortfolioHistoryEtc,
  PortfolioHistoryEtcSubtitle,
  PortfolioHistoryEtcSubtitleValue
} from "./portfolio-history-etc.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
      PortfolioHistoryEtc,
      PortfolioHistoryEtcSubtitle,
      PortfolioHistoryEtcSubtitleValue,
    ]),
  ],
  controllers: [PortfolioHistoryEtcController],
  providers: [PortfolioHistoryEtcService],
})
export class PortfolioHistoryEtcModule {}
