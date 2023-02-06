import { Module } from '@nestjs/common';
import { PortfolioMainVisualService } from './portfolio-main-visual.service';
import { PortfolioMainVisualController } from './portfolio-main-visual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioMainVisual } from './portfolio-main-visual.entity';
import { PortfolioMainVisualTag } from '../portfolio-main-visual-tag/portfolio-main-visual-tag.entity';
import { PortfolioMainVisualTheme } from '../portfolio-main-visual-theme/portfolio-main-visual-theme.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PortfolioMainVisual,
      PortfolioMainVisual,
      PortfolioMainVisualTheme,
    ]),
  ],
  providers: [PortfolioMainVisualService],
  controllers: [PortfolioMainVisualController],
})
export class PortfolioMainVisualModule {}
