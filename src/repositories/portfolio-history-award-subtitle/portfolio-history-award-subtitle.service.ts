import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioHistoryAwardSubtitle } from './portfolio-history-award-subtitle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioHistoryAwardSubtitleService {
  constructor(
    @InjectRepository(PortfolioHistoryAwardSubtitle)
    private portfolioHistoryAwardYearRepository: Repository<PortfolioHistoryAwardSubtitle>,
  ) {}
}
