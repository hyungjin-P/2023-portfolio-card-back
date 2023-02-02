import { Module } from '@nestjs/common';
import { PortfolioMainVisualService } from './portfolio-main-visual.service';
import { PortfolioMainVisualController } from './portfolio-main-visual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioMainVisual } from './portfolio-main-visual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioMainVisual])],
  providers: [PortfolioMainVisualService],
  controllers: [PortfolioMainVisualController],
})
export class PortfolioMainVisualModule {}
