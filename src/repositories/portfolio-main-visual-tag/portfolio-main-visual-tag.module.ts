import { Module } from '@nestjs/common';
import { PortfolioMainVisualTagController } from './portfolio-main-visual-tag.controller';
import { PortfolioMainVisualTagService } from './portfolio-main-visual-tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioMainVisualTag } from './portfolio-main-visual-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioMainVisualTag])],
  controllers: [PortfolioMainVisualTagController],
  providers: [PortfolioMainVisualTagService],
})
export class PortfolioMainVisualTagModule {}
