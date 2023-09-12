import { Module } from '@nestjs/common';
import { PortfolioHistoryExhibitionSubtitleController } from './portfolio-history-exhibition-subtitle.controller';
import { PortfolioHistoryExhibitionSubtitleService } from './portfolio-history-exhibition-subtitle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryExhibitionSubtitle } from './portfolio-history-exhibition-subtitle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryExhibitionSubtitle])],
  controllers: [PortfolioHistoryExhibitionSubtitleController],
  providers: [PortfolioHistoryExhibitionSubtitleService],
})
export class PortfolioHistoryExhibitionSubtitleModule {}
