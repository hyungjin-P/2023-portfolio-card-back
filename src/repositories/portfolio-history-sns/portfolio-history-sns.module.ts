import { Module } from '@nestjs/common';
import { PortfolioHistorySnsController } from './portfolio-history-sns.controller';
import { PortfolioHistorySnsService } from './portfolio-history-sns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistorySns } from './portfolio-history-sns.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistorySns])],
  controllers: [PortfolioHistorySnsController],
  providers: [PortfolioHistorySnsService],
})
export class PortfolioHistorySnsModule {}
