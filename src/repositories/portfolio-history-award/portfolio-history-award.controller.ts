import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PortfolioHistoryAwardService } from "./portfolio-history-award.service";
import { PortfolioHistoryAward } from "./portfolio-history-award.entity";

@Controller('portfolio-history-award')
@ApiTags('작기이력 > 수상내역')
export class PortfolioHistoryAwardController {
  constructor(private service: PortfolioHistoryAwardService) {}

  @Get('getData')
  @ApiOperation({
    summary: '학력 정보 조회',
    description: '히스토리 아이디로 작가 1인 수상 정보 조회'
  })
  async getDataByPortfolioHistoryId(
    @Query('historyId') historyId: string,
  ): Promise<PortfolioHistoryAward[]>{
    return await this.service.getDataByPortfolioHistoryId(historyId);
  }

  @Post('/saveData')
  @ApiOperation({
    summary: '수상 정보 저장',
    description: '전체 정보를 가져와 수상 아이디 값을 비교 후\n' +
      '수상 정보를 순차적으로 저장'
  })
  async saveData(
    @Query('historyId') historyId: string,
    @Body() saveList: PortfolioHistoryAward[],
  ): Promise<PortfolioHistoryAward[]>{
    return await this.service.saveData(historyId, saveList);
  }

  @Delete('/delete')
  @ApiOperation({
    summary: '수상 정보 삭제',
    description: '수상 정보 소프트 삭제'
  })
  async delete(@Query('id') id: string){
    return await this.service.deleteById(id);
  }

  @Delete('/deleteSubtitle')
  @ApiOperation({
    summary: '수상 년도 삭제',
    description: '수상 년도 소프트 삭제'
  })
  async deleteSubtitle(@Query('id') id: string){
    return await this.service.deleteSubtitleById(id);
  }

  @Delete('/deleteValue')
  @ApiOperation({
    summary: '수상 내용 삭제',
    description: '수상 내용 소프트 삭제'
  })
  async deleteValue(@Query('id') id: string){
    return await this.service.deleteValueById(id);
  }
}
