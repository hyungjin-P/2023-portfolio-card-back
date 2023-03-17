import { Module } from '@nestjs/common';
import { PortfolioArtWorkService } from './portfolio-art-work.service';
import { PortfolioArtWorkController } from './portfolio-art-work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioArtWork } from './portfolio-art-work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioArtWork])],
  providers: [PortfolioArtWorkService],
  controllers: [PortfolioArtWorkController],
})
export class PortfolioArtWorkModule {}
