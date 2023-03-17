import { Module } from '@nestjs/common';
import { PortfolioArtWorkPictureService } from './portfolio-art-work-picture.service';
import { PortfolioArtWorkPictureController } from './portfolio-art-work-picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioArtWorkPicture } from './portfolio-art-work-picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioArtWorkPicture])],
  providers: [PortfolioArtWorkPictureService],
  controllers: [PortfolioArtWorkPictureController],
})
export class PortfolioArtWorkPictureModule {}
