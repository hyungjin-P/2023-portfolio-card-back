import { Injectable } from '@nestjs/common';
import { PortfolioHistory } from './portfolio-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioHistoryService {
  constructor(
    @InjectRepository(PortfolioHistory)
    private portfolioHistoryRepository: Repository<PortfolioHistory>,
  ) {}

  async createPortfolioHistory(portfolioId: string) {
    let history: PortfolioHistory = await this.portfolioHistoryRepository.findOne({
      where:{portfolioId: portfolioId,}
    });

    if(!history){
      history = await this.portfolioHistoryRepository.save({portfolioId: portfolioId});
    }
    return history;
  }

  async getAllHistoryByPortfolioId(portfolioId: string): Promise<PortfolioHistory> {
    return await this.portfolioHistoryRepository.findOne({
      where: {
        portfolioId: portfolioId,
      },
      relations: {
        portfolioHistoryGenerals: true,
        portfolioHistoryContacts: true,
        portfolioHistoryEducations: { subtitles: { values:true } },
        portfolioHistoryExhibitions: { subtitles: { values:true } },
        portfolioHistoryAwards: { subtitles: { values:true } },
        portfolioHistoryEtc: { subtitles: { values:true } },
      },
      order: {
        portfolioHistoryEducations: {createdAt: 'ASC', subtitles: {createdAt: 'ASC', values: {createdAt: 'ASC'}}},
        portfolioHistoryExhibitions: {createdAt: 'ASC', subtitles: {createdAt: 'ASC', values: {createdAt: 'ASC'}}},
        portfolioHistoryAwards: {createdAt: 'ASC', subtitles: {createdAt: 'ASC', values: {createdAt: 'ASC'}}},
        portfolioHistoryEtc: {createdAt: 'ASC', subtitles: {createdAt: 'ASC', values: {createdAt: 'ASC'}}},
      }
    });
  }
}
