import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { PortfolioHistoryEtc } from "./portfolio-history-etc.entity";
import { PortfolioHistoryEtcService } from "./portfolio-history-etc.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller('portfolio-history-etc')
export class PortfolioHistoryEtcController {
  constructor(private service: PortfolioHistoryEtcService) {
  }

  @Get('getData')
  @ApiOperation({
    summary: '학력 정보 조회',
    description: '히스토리 아이디로 작가 1인 학력 정보 조회'
  })
  async getDataByPortfolioHistoryId(
    @Query('historyId') historyId: string,
  ): Promise<PortfolioHistoryEtc[]>{
    return await this.service.getDataByPortfolioHistoryId(historyId);
  }

  @Post('/saveData')
  @ApiOperation({
    summary: '학력 정보 저장',
    description: '전체 정보를 가져와 학력 아이디 값을 비교 후\n' +
      '학력 정보를 순차적으로 저장'
  })
  async saveData(
    @Query('historyId') historyId: string,
    @Body() saveList: PortfolioHistoryEtc[],
  ): Promise<PortfolioHistoryEtc[]>{
    return await this.service.saveData(historyId, saveList);
  }
}
