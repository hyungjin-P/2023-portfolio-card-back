import { ConsoleLogger, HttpException, Injectable } from "@nestjs/common";
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
    const educations: PortfolioHistoryEducation[] = await this.educationRepository.find({
      where: {
        portfolioHistoryId: historyId,
      },
      relations: {
        subtitles: {
          values: true,
        },
      },
      order: {
        createdAt: 'ASC',
      }
    });

    if(!educations){
      throw new HttpException(
        {
          message: '학력정보 오류 발생!',
        },
        500,
      );
    }

    return educations;
  }

  async saveData(historyId, saveList: PortfolioHistoryEducation[]): Promise<PortfolioHistoryEducation[]> {
    saveList.map(async (block)=>{
      if(block.id.length > 5){ // 기존 저장 정보 수정
        await this.educationSubtitleRepository.save({
          id: block.subtitles[0].id,
          subtitle: block.subtitles[0].subtitle,
        });
        await this.educationSubtitleValueRepository.save({
          id: block.subtitles[0].values[0].id,
          value: block.subtitles[0].values[0].value,
        })
      }else{ // 신규 저장 정보
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
