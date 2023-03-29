import { Injectable } from '@nestjs/common';
import { PortfolioHistoryAwardYearContent } from './portfolio-history-award-year-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioHistoryAwardYearContentService {
  constructor(
    @InjectRepository(PortfolioHistoryAwardYearContent)
    private portfolioHistoryAwardYearContentRepository: Repository<PortfolioHistoryAwardYearContent>,
  ) {}
}
