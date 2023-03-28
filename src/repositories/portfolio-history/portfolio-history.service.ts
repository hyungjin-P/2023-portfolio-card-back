import { Injectable } from '@nestjs/common';
import { PortfolioHistory } from './portfolio-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioHistoryService {
  constructor(
    @InjectRepository(PortfolioHistory)
    private PortfolioHistoryRepository: Repository<PortfolioHistory>,
  ) {}
}
