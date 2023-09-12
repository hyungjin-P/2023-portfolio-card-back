import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {
  PortfolioHistoryEducation,
  PortfolioHistoryEducationSubtitle,
  PortfolioHistoryEducationSubtitleValue
} from "./portfolio-history-education.entity";
import { Repository } from "typeorm";
import { PortfolioHistoryEducationSaveDtoList } from "./dto/portfolio-history-education-save.dto";

@Injectable()
export class PortfolioHistoryEducationService {
  constructor(
    @InjectRepository(PortfolioHistoryEducation)
    private educationRepository: Repository<PortfolioHistoryEducation>,
    @InjectRepository(PortfolioHistoryEducationSubtitle)
    private educationSubtitleRepository: Repository<PortfolioHistoryEducationSubtitle>,
    @InjectRepository(PortfolioHistoryEducationSubtitleValue)
    private educationSubtitleValueRepository: Repository<PortfolioHistoryEducationSubtitle>
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
    return await this.educationRepository.find({
      where: {
        portfolioHistoryId: historyId,
      },
      relations: {
        subtitles: {
          values : true,
        }
      },
      order: {
        createdAt: 'DESC',
      }
    })
  }

  async saveData(saveList: PortfolioHistoryEducationSaveDtoList) {
    console.log(saveList);
    saveList.educationBlockSections.map((block)=>{
      if(block.id.length > 5){
        console.log('save : ', block.id);
      }else{
        console.log('create : ', block.id);
      }
    });

    return Promise.resolve(undefined);
  }
}
