import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  PortfolioHistoryAward,
  PortfolioHistoryAwardSubtitle,
  PortfolioHistoryAwardSubtitleValue
} from "./portfolio-history-award.entity";
import { Repository } from "typeorm";

@Injectable()
export class PortfolioHistoryAwardService {
  constructor(
    @InjectRepository(PortfolioHistoryAward)
    private awardRepository: Repository<PortfolioHistoryAward>,
    @InjectRepository(PortfolioHistoryAwardSubtitle)
    private awardSubtitleRepository: Repository<PortfolioHistoryAwardSubtitle>,
    @InjectRepository(PortfolioHistoryAwardSubtitleValue)
    private awardSubtitleValueRepository: Repository<PortfolioHistoryAwardSubtitleValue>,
  ) {}


  async getDataByPortfolioHistoryId(historyId: string): Promise<PortfolioHistoryAward[]>{
    const award: PortfolioHistoryAward[] = await this.awardRepository.find({
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
        subtitles: {
          createdAt: 'ASC',
          values: {
            createdAt: 'ASC',
          }
        }
      }
    });

    if (!award){
      throw new HttpException(
        {
          message: '전시정보 오류 발생!',
        },
        500,
      );
    }

    return award;
  }

  async saveData(historyId, saveList: PortfolioHistoryAward[]): Promise<PortfolioHistoryAward[]> {
    saveList.map(async (block)=>{
      let awardId = block.id;
      if (awardId.length > 5){ //기존 저장 정보 수정
        await this.awardRepository.save({
          id: awardId,
          title: block.title,
        })
      }else{ //신규 저장 정보
        const savedAward: PortfolioHistoryAward = await this.awardRepository.save({
          portfolioHistoryId: historyId,
          title: block.title,
        });

        awardId = savedAward.id;
      }

      if(block.subtitles.length > 0){
        block.subtitles.map(async (subtitle)=>{
          let subtitleId = subtitle.id;

          if(subtitleId.length > 5){
            await this.awardSubtitleRepository.save({
              id: subtitleId,
              subtitle: subtitle.subtitle,
            })
          }else{
            const savedSubtitle: PortfolioHistoryAwardSubtitle = await this.awardSubtitleRepository.save({
              portfolioHistoryAwardId: awardId,
              subtitle: subtitle.subtitle,
            })
            subtitleId = savedSubtitle.id;
          }

          if(subtitle.values.length > 0){
            subtitle.values.map(async (value)=>{
              if (value.id.length > 5){
                await this.awardSubtitleValueRepository.save({
                  id: value.id,
                  value: value.value,
                });
              }else{
                await this.awardSubtitleValueRepository.save({
                  portfolioHistoryAwardSubtitleId: subtitleId,
                  value: value.value,
                });
              }
            })
          }
        })
      }
    });

    await this.delay(200);

    return await this.getDataByPortfolioHistoryId(historyId);
  }

  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async deleteById(id: string){
    return await this.awardRepository.softDelete(id);
  }

  async deleteSubtitleById(id: string){
    return await this.awardSubtitleRepository.softDelete(id);
  }

  async deleteValueById(id: string){
    return await this.awardSubtitleValueRepository.softDelete(id);
  }
}
