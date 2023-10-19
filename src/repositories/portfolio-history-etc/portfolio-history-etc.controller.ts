import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { PortfolioHistoryEtc } from "./portfolio-history-etc.entity";
import { PortfolioHistoryEtcService } from "./portfolio-history-etc.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('portfolio-history-etc')
@ApiTags('포트폴리오 기타 이력')
export class PortfolioHistoryEtcController {
  constructor(private service: PortfolioHistoryEtcService) {
  }

  @Get('getData')
  @ApiOperation({
    summary: '기타 정보 조회',
    description: '히스토리 아이디로 작가 1인 기타 정보 조회'
  })
  async getDataByPortfolioHistoryId(
    @Query('historyId') historyId: string,
  ): Promise<PortfolioHistoryEtc[]>{
    return await this.service.getDataByPortfolioHistoryId(historyId);
  }

  @Post('/saveData')
  @ApiOperation({
    summary: '기타 정보 저장',
    description: '전체 정보를 가져와 기타 아이디 값을 비교 후\n' +
      '기타 정보를 순차적으로 저장'
  })
  async saveData(
    @Query('historyId') historyId: string,
    @Body() saveList: PortfolioHistoryEtc[],
  ): Promise<PortfolioHistoryEtc[]>{
    return await this.service.saveData(historyId, saveList);
  }

  @Delete('/delete')
  @ApiOperation({
    summary: '기타 정보 삭제',
    description: '기타 정보 소프트 삭제'
  })
  async delete(@Query('id') id: string){
    return await this.service.deleteById(id);
  }

  @Delete('/deleteSubtitle')
  @ApiOperation({
    summary: '기타 년도 삭제',
    description: '기타 년도 소프트 삭제'
  })
  async deleteSubtitle(@Query('id') id: string){
    return await this.service.deleteSubtitleById(id);
  }

  @Delete('/deleteValue')
  @ApiOperation({
    summary: '기타 내용 삭제',
    description: '기타 내용 소프트 삭제'
  })
  async deleteValue(@Query('id') id: string){
    return await this.service.deleteValueById(id);
  }
}
