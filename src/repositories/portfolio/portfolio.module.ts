import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './portfolio.entity';
import { PortfolioMainVisual } from '../portfolio-main-visual/portfolio-main-visual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, PortfolioMainVisual])],
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
