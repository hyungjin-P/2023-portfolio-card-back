import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PortfolioArtWorkPicture } from './portfolio-art-work-picture.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PortfolioArtWorkPictureService {
  constructor(
    @InjectRepository(PortfolioArtWorkPicture)
    private portfolioArtWorkPicture: Repository<PortfolioArtWorkPicture>,
  ) {}



}
