import { Module } from '@nestjs/common';
import { PortfolioArtWorkService } from './portfolio-art-work.service';
import { PortfolioArtWorkController } from './portfolio-art-work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioArtWork } from './portfolio-art-work.entity';
import { PortfolioArtWorkBlock } from '../portfolio-art-work-block/portfolio-art-work-block.entity';
import { PortfolioArtWorkPicture } from '../portfolio-art-work-picture/portfolio-art-work-picture.entity';
import { User } from '../user/user.entity';
import { Portfolio } from '../portfolio/portfolio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PortfolioArtWork,
      PortfolioArtWorkBlock,
      PortfolioArtWorkPicture,
      Portfolio,
      User,
    ]),
  ],
  providers: [PortfolioArtWorkService],
  controllers: [PortfolioArtWorkController],
})
export class PortfolioArtWorkModule {}
