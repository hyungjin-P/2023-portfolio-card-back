import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioArtWork } from './portfolio-art-work.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioArtWorkService {
  constructor(
    @InjectRepository(PortfolioArtWork)
    private portfolioArtWorkRepository: Repository<PortfolioArtWork>,
  ) {}
}
