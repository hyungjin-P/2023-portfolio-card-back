import { Module } from '@nestjs/common';
import { PortfolioHistoryExhibitionSubtitleValueService } from './portfolio-history-exhibition-subtitle-value.service';
import { PortfolioHistoryExhibitionSubtitleValueController } from './portfolio-history-exhibition-subtitle-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryExhibitionSubtitleValue } from './portfolio-history-exhibition-subtitle-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryExhibitionSubtitleValue])],
  providers: [PortfolioHistoryExhibitionSubtitleValueService],
  controllers: [PortfolioHistoryExhibitionSubtitleValueController],
})
export class PortfolioHistoryExhibitionSubtitleValueModule {}
