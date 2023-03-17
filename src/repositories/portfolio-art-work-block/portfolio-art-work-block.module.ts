import { Module } from '@nestjs/common';
import { PortfolioArtWorkBlockService } from './portfolio-art-work-block.service';
import { PortfolioArtWorkBlockController } from './portfolio-art-work-block.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioArtWorkBlock } from './portfolio-art-work-block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioArtWorkBlock])],
  providers: [PortfolioArtWorkBlockService],
  controllers: [PortfolioArtWorkBlockController],
})
export class PortfolioArtWorkBlockModule {}
