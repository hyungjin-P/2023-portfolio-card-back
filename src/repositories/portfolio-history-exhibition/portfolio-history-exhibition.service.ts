import { HttpException, Injectable } from "@nestjs/common";
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
    const exhibitions: PortfolioHistoryExhibition[] = await this.exhibitionRepository.find({
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

    if (!exhibitions){
      throw new HttpException(
        {
          message: '전시정보 오류 발생!',
        },
        500,
      );
    }

    return exhibitions;
  }

  async saveData(historyId, saveList: PortfolioHistoryExhibition[]): Promise<PortfolioHistoryExhibition[]> {
    saveList.map(async (block)=>{
      let exhibitionId = block.id;
      if (exhibitionId.length > 5){ //기존 저장 정보 수정
        await this.exhibitionRepository.save({
          id: exhibitionId,
          title: block.title,
        })
      }else{ //신규 저장 정보
        const savedEducation: PortfolioHistoryExhibition = await this.exhibitionRepository.save({
          portfolioHistoryId: historyId,
          title: block.title,
        });

        exhibitionId = savedEducation.id;
      }

      if(block.subtitles.length > 0){
        block.subtitles.map(async (subtitle)=>{
          let subtitleId = subtitle.id;

          if(subtitleId.length > 5){
            await this.exhibitionSubtitleRepository.save({
              id: subtitleId,
              subtitle: subtitle.subtitle,
            })
          }else{
            const savedSubtitle: PortfolioHistoryExhibitionSubtitle = await this.exhibitionSubtitleRepository.save({
              portfolioHistoryAwardId: exhibitionId,
              subtitle: subtitle.subtitle,
            })
            subtitleId = savedSubtitle.id;
          }

          if(subtitle.values.length > 0){
            subtitle.values.map(async (value)=>{
              if (value.id.length > 5){
                await this.exhibitionSubtitleValueRepository.save({
                  id: value.id,
                  value: value.value,
                });
              }else{
                await this.exhibitionSubtitleValueRepository.save({
                  portfolioHistoryExhibitionSubtitleId: subtitleId,
                  value: value.value,
                });
              }
            })
          }
        })
      }
    })
    return await this.getDataByPortfolioHistoryId(historyId);
  }
}
