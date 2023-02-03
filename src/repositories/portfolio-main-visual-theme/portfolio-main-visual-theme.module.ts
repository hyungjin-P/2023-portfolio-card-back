import { Module } from '@nestjs/common';
import { PortfolioMainVisualThemeService } from './portfolio-main-visual-theme.service';
import { PortfolioMainVisualThemeController } from './portfolio-main-visual-theme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioMainVisualTheme } from './portfolio-main-visual-theme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioMainVisualTheme])],
  providers: [PortfolioMainVisualThemeService],
  controllers: [PortfolioMainVisualThemeController],
})
export class PortfolioMainVisualThemeModule {}
