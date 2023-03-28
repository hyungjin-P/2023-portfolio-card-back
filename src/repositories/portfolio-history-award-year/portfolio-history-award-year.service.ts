import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioHistoryAwardYear } from './portfolio-history-award-year.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioHistoryAwardYearService {
  constructor(
    @InjectRepository(PortfolioHistoryAwardYear)
    private portfolioHistoryAwardYearRepository: Repository<PortfolioHistoryAwardYear>,
  ) {}
}
