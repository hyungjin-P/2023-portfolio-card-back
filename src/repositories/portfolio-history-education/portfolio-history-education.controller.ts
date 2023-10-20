import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { PortfolioHistoryEducationService } from "./portfolio-history-education.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PortfolioHistoryEducation } from "./portfolio-history-education.entity";

@Controller('portfolio-history-education')
@ApiTags('포트폴리오 학력')
export class PortfolioHistoryEducationController {
  constructor(private service: PortfolioHistoryEducationService) {}

  @Get('/getAll')
  @ApiOperation({
    summary: '학력 정보 전체 조회',
    description: '모든 이용자 학력 정보 조회'
  })
  async getAll(): Promise<PortfolioHistoryEducation[]>{
    return await this.service.getAll();
  }

  @Get('/getData')
  @ApiOperation({
    summary: '학력 정보 조회',
    description: '히스토리 아이디로 작가 1인 학력 정보 조회'
  })
  async getDataByPortfolioHistoryId(
    @Query('historyId') historyId: string,
  ): Promise<PortfolioHistoryEducation[]>{
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
    @Body() saveList: PortfolioHistoryEducation[],
  ): Promise<PortfolioHistoryEducation[]>{
    return await this.service.saveData(historyId, saveList);
  }

  @Delete('/delete')
  @ApiOperation({
    summary: '학력 정보 삭제',
    description: '학력 정보 소프트 삭제'
  })
  async delete(@Query('id') id: string){
    return await this.service.deleteById(id);
  }

  @Delete('/deleteSubtitle')
  @ApiOperation({
    summary: '학력 년도 삭제',
    description: '학력 년도 소프트 삭제'
  })
  async deleteSubtitle(@Query('id') id: string){
    return await this.service.deleteSubtitleById(id);
  }

  @Delete('/deleteValue')
  @ApiOperation({
    summary: '학력 내용 삭제',
    description: '학력 내용 소프트 삭제'
  })
  async deleteValue(@Query('id') id: string){
    return await this.service.deleteValueById(id);
  }
}
