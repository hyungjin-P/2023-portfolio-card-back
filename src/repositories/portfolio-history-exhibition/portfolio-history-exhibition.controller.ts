import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioHistoryExhibition } from './portfolio-history-exhibition.entity';
import { PortfolioHistoryExhibitionService } from './portfolio-history-exhibition.service';

@Controller('portfolio-history-exhibition')
@ApiTags('포트폴리오 전시 경력')
export class PortfolioHistoryExhibitionController {
  constructor(private service: PortfolioHistoryExhibitionService){}

  @Get('/getData')
  @ApiOperation({
    summary: '전시 정보 조회',
    description: '히스토리 아이디로 작가 1인 전시 정보 조회'
  })
  async getDataByPortfolioHistoryId(
    @Query('historyId') historyId: string,
  ): Promise<PortfolioHistoryExhibition[]>{
    return await this.service.getDataByPortfolioHistoryId(historyId);
  }

  @Post('/saveData')
  @ApiOperation({
    summary: '전시 정보 저장',
    description: '전체 정보를 가져와 학력 아이디 값을 비교 후\n' +
      '전시 정보를 순차적으로 저장'
  })
  async saveData(
    @Query('historyId') historyId: string,
    @Body() saveList: PortfolioHistoryExhibition[],
  ): Promise<PortfolioHistoryExhibition[]>{
    return await this.service.saveData(historyId, saveList);
  }

  @Delete('/delete')
  @ApiOperation({
    summary: '전시 정보 삭제',
    description: '전시 정보 소프트 삭제'
  })
  async delete(@Query('id') id: string){
    return await this.service.deleteById(id);
  }

  @Delete('/deleteSubtitle')
  @ApiOperation({
    summary: '전시 년도 삭제',
    description: '전시 년도 소프트 삭제'
  })
  async deleteSubtitle(@Query('id') id: string){
    return await this.service.deleteSubtitleById(id);
  }

  @Delete('/deleteValue')
  @ApiOperation({
    summary: '전시 내용 삭제',
    description: '전시 내용 소프트 삭제'
  })
  async deleteValue(@Query('id') id: string){
    return await this.service.deleteValueById(id);
  }
}
