import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioHistoryExhibition } from './portfolio-history-exhibition.entity';
import { PortfolioHistoryExhibitionService } from './portfolio-history-exhibition.service';

@Controller('portfolio-history-exhibition')
@ApiTags('포트폴리오 전시 경력')
export class PortfolioHistoryExhibitionController {
  constructor(private service: PortfolioHistoryExhibitionService){}

  @Get('/getData')
  @ApiOperation({
    summary: '학력 정보 조회',
    description: '히스토리 아이디로 작가 1인 학력 정보 조회'
  })
  async getDataByPortfolioHistoryId(
    @Query('historyId') historyId: string,
  ): Promise<PortfolioHistoryExhibition[]>{
    return await this.service.getDataByPortfolioHistoryId(historyId);
  }

}
