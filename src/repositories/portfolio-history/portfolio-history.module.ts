import { Module } from '@nestjs/common';
import { PortfolioHistoryService } from './portfolio-history.service';
import { PortfolioHistoryController } from './portfolio-history.controller';
import { PortfolioHistory } from './portfolio-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistory])],
  providers: [PortfolioHistoryService],
  controllers: [PortfolioHistoryController],
})
export class PortfolioHistoryModule {}
