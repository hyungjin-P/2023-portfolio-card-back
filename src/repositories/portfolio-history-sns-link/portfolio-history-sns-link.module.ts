import { Module } from '@nestjs/common';
import { PortfolioHistorySnsLinkController } from './portfolio-history-sns-link.controller';
import { PortfolioHistorySnsLinkService } from './portfolio-history-sns-link.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistorySnsLink } from './portfolio-history-sns-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistorySnsLink])],
  controllers: [PortfolioHistorySnsLinkController],
  providers: [PortfolioHistorySnsLinkService],
})
export class PortfolioHistorySnsLinkModule {}
