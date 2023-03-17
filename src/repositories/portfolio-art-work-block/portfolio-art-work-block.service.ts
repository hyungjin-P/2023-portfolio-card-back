import { Injectable } from '@nestjs/common';
import { PortfolioArtWorkBlock } from './portfolio-art-work-block.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PortfolioArtWorkBlockService {
  constructor(
    @InjectRepository(PortfolioArtWorkBlock)
    private portfolioArtWorkBlockRepository: Repository<PortfolioArtWorkBlock>,
  ) {
  }

}
