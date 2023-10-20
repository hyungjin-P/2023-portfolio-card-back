import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  PortfolioHistoryEtc,
  PortfolioHistoryEtcSubtitle,
  PortfolioHistoryEtcSubtitleValue
} from "./portfolio-history-etc.entity";

@Injectable()
export class PortfolioHistoryEtcService {
  constructor(
    @InjectRepository(PortfolioHistoryEtc)
    private etcRepository: Repository<PortfolioHistoryEtc>,
    @InjectRepository(PortfolioHistoryEtcSubtitle)
    private etcSubtitleRepository: Repository<PortfolioHistoryEtcSubtitle>,
    @InjectRepository(PortfolioHistoryEtcSubtitleValue)
    private etcSubtitleValueRepository: Repository<PortfolioHistoryEtcSubtitleValue>,
  ) {
  }

  async getDataByPortfolioHistoryId(historyId: string): Promise<PortfolioHistoryEtc[]>{
    const etc: PortfolioHistoryEtc[] = await this.etcRepository.find({
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

    if (!etc){
      throw new HttpException(
        {
          message: '전시정보 오류 발생!',
        },
        500,
      );
    }

    return etc;
  }

  async saveData(historyId, saveList: PortfolioHistoryEtc[]): Promise<PortfolioHistoryEtc[]> {
    saveList.map(async (block)=>{
      let etcId = block.id;
      if (etcId.length > 5){ //기존 저장 정보 수정
        await this.etcRepository.save({
          id: etcId,
          title: block.title,
        })
      }else{ //신규 저장 정보
        const savedEtc: PortfolioHistoryEtc = await this.etcRepository.save({
          portfolioHistoryId: historyId,
          title: block.title,
        });

        etcId = savedEtc.id;
      }

      if(block.subtitles.length > 0){
        block.subtitles.map(async (subtitle)=>{
          let subtitleId = subtitle.id;

          if(subtitleId.length > 5){
            await this.etcSubtitleRepository.save({
              id: subtitleId,
              subtitle: subtitle.subtitle,
            })
          }else{
            const savedSubtitle: PortfolioHistoryEtcSubtitle = await this.etcSubtitleRepository.save({
              portfolioHistoryEtcId: etcId,
              subtitle: subtitle.subtitle,
            });

            subtitleId = savedSubtitle.id;
          }

          if(subtitle.values.length > 0){
            subtitle.values.map(async (value)=>{
              if (value.id.length > 5){
                await this.etcSubtitleValueRepository.save({
                  id: value.id,
                  value: value.value,
                });
              }else{
                await this.etcSubtitleValueRepository.save({
                  portfolioHistoryEtcSubtitleId: subtitleId,
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
    return await this.etcRepository.softDelete(id);
  }

  async deleteSubtitleById(id: string){
    return await this.etcSubtitleRepository.softDelete(id);
  }

  async deleteValueById(id: string){
    return await this.etcSubtitleValueRepository.softDelete(id);
  }
}
