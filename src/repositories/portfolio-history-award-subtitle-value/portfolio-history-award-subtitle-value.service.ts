import { Injectable } from '@nestjs/common';
import { PortfolioHistoryAwardSubtitleValue } from './portfolio-history-award-subtitle-value.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioHistoryAwardSubtitleValueService {
  constructor(
    @InjectRepository(PortfolioHistoryAwardSubtitleValue)
    private portfolioHistoryAwardYearContentRepository: Repository<PortfolioHistoryAwardSubtitleValue>,
  ) {}
}
