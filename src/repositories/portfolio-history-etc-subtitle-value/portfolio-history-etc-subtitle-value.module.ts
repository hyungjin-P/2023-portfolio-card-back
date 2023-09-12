import { Module } from '@nestjs/common';
import { PortfolioHistoryEtcSubtitleValueService } from './portfolio-history-etc-subtitle-value.service';
import { PortfolioHistoryEtcSubtitleValueController } from './portfolio-history-etc-subtitle-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryEtcSubtitleValue } from './portfolio-history-etc-subtitle-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryEtcSubtitleValue])],
  providers: [PortfolioHistoryEtcSubtitleValueService],
  controllers: [PortfolioHistoryEtcSubtitleValueController],
})
export class PortfolioHistoryEtcSubtitleValueModule {}
