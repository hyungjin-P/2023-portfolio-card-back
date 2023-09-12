import { Module } from '@nestjs/common';
import { PortfolioHistoryEtcSubtitleController } from './portfolio-history-etc-subtitle.controller';
import { PortfolioHistoryEtcSubtitleService } from './portfolio-history-etc-subtitle.service';
import { PortfolioHistoryEtcSubtitle } from './portfolio-history-etc-subtitle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryEtcSubtitle])],
  controllers: [PortfolioHistoryEtcSubtitleController],
  providers: [PortfolioHistoryEtcSubtitleService],
})
export class PortfolioHistoryEtcSubtitleModule {}
