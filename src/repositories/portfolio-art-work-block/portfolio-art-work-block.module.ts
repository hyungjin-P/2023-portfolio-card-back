import { Module } from '@nestjs/common';
import { PortfolioArtWorkBlockService } from './portfolio-art-work-block.service';
import { PortfolioArtWorkBlockController } from './portfolio-art-work-block.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioArtWorkBlock } from './portfolio-art-work-block.entity';
import { PortfolioArtWorkPictureService } from '../portfolio-art-work-picture/portfolio-art-work-picture.service';
import { PortfolioArtWorkPicture } from '../portfolio-art-work-picture/portfolio-art-work-picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioArtWorkBlock, PortfolioArtWorkPicture])],
  providers: [PortfolioArtWorkBlockService, PortfolioArtWorkPictureService],
  controllers: [PortfolioArtWorkBlockController],
})
export class PortfolioArtWorkBlockModule {}
