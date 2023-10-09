import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioHistoryExhibition, PortfolioHistoryExhibitionSubtitle, PortfolioHistoryExhibitionSubtitleValue } from './portfolio-history-exhibition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioHistoryExhibitionService {
  constructor(
    @InjectRepository(PortfolioHistoryExhibition)
    private exhibitionRepository: Repository<PortfolioHistoryExhibition>,
    @InjectRepository(PortfolioHistoryExhibitionSubtitle)
    private exhibitionSubtitleRepository: Repository<PortfolioHistoryExhibitionSubtitle>,
    @InjectRepository(PortfolioHistoryExhibitionSubtitleValue)
    private exhibitionSubtitleValueRepository: Repository<PortfolioHistoryExhibitionSubtitleValue>
  ) {}

  async getDataByPortfolioHistoryId(historyId: string): Promise<PortfolioHistoryExhibition[]>{
    const educationList: PortfolioHistoryExhibition[] = await this.exhibitionRepository.find({
      where: {
        portfolioHistoryId: historyId,
      },
      relations: {
        subtitles: {
          values: true,
        },
      },
      order: {
        createdAt: 'DESC',
      }
    });

    return educationList;
  }

  async saveData(historyId, saveList: PortfolioHistoryExhibition[]): Promise<PortfolioHistoryExhibition[]> {
    
    return null;
  }
}
