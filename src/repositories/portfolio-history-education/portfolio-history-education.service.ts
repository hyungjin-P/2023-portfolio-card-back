import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {
  PortfolioHistoryEducation,
  PortfolioHistoryEducationSubtitle,
  PortfolioHistoryEducationSubtitleValue
} from "./portfolio-history-education.entity";
import { Repository } from "typeorm";

@Injectable()
export class PortfolioHistoryEducationService {
  constructor(
    @InjectRepository(PortfolioHistoryEducation)
    private educationRepository: Repository<PortfolioHistoryEducation>,
    @InjectRepository(PortfolioHistoryEducationSubtitle)
    private educationSubtitleRepository: Repository<PortfolioHistoryEducationSubtitle>,
    @InjectRepository(PortfolioHistoryEducationSubtitleValue)
    private educationSubtitleValueRepository: Repository<PortfolioHistoryEducationSubtitleValue>
  ) {}

  async getAll(): Promise<PortfolioHistoryEducation[]> {
    return await this.educationRepository.find({
      relations: {
        subtitles: {
          values : true,
        }
      },
      order: {
        createdAt: 'DESC',
      }
    });
  }

  async getDataByPortfolioHistoryId(historyId: string): Promise<PortfolioHistoryEducation[]>{
    const educationList: PortfolioHistoryEducation[] = await this.educationRepository.find({
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

  async saveData(historyId, saveList: PortfolioHistoryEducation[]): Promise<PortfolioHistoryEducation[]> {
    saveList.map(async (block)=>{
      if(block.id.length > 5){
        await this.educationSubtitleRepository.save({
          id: block.subtitles[0].id,
          subtitle: block.subtitles[0].subtitle,
        });
        await this.educationSubtitleValueRepository.save({
          id: block.subtitles[0].values[0].id,
          value: block.subtitles[0].values[0].value,
        })
      }else{
        const savedEducation: PortfolioHistoryEducation = await this.educationRepository.save({
          portfolioHistoryId: historyId,
          title: 'none title content',
        });

        const savedEducationSubtitle: PortfolioHistoryEducationSubtitle = await this.educationSubtitleRepository.save({
          portfolioHistoryEducationId: savedEducation.id,
          subtitle: block.subtitles[0].subtitle,
        });

        const savedEducationValue: PortfolioHistoryEducationSubtitleValue
         = await this.educationSubtitleValueRepository.save({
          portfolioHistoryEducationSubtitleId: savedEducationSubtitle.id,
          value: block.subtitles[0].values[0].value,
         });
      }
    });

    return await this.getDataByPortfolioHistoryId(historyId);
  }
}
