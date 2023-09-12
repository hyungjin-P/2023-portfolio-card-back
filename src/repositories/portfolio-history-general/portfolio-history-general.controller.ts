import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { PortfolioHistoryGeneralService } from "./portfolio-history-general.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PortfolioHistoryGeneral } from "./portfolio-history-general.entity";

@Controller('portfolio-history-general')
@ApiTags('포트폴리오 기본정보')
export class PortfolioHistoryGeneralController {
  constructor(private portfolioHistoryGeneralService: PortfolioHistoryGeneralService) {}

  @Get('/getAll')
  @ApiOperation({
    summary: '포트폴리오 기본 정보 전체 조회'
  })
  async getAllPortfolioGeneral(): Promise<PortfolioHistoryGeneral[]>{
    return await this.portfolioHistoryGeneralService.getAll();
  }

  @Post('/create')
  @ApiOperation({
    summary: '포트폴리오 기본 정보 추가'
  })
  async createPortfolioGeneral(
    @Query('portfolioHistoryId') portfolioHistoryId: string,
  ): Promise<PortfolioHistoryGeneral>{
    return await this.portfolioHistoryGeneralService.createPortfolioGeneral(portfolioHistoryId);
  }

  @Post('save')
  @ApiOperation({
    summary: '포트폴리오 기본 정보 추가'
  })
  async savePortfolioGeneral(
    @Body() portfolioGeneral: PortfolioHistoryGeneral,
  ): Promise<PortfolioHistoryGeneral>{
    return await this.portfolioHistoryGeneralService.savePortfolioGeneral(portfolioGeneral);
  }

  @Delete('delete')
  @ApiOperation({
    summary: '포트폴리오 기본 정보 삭제'
  })
  async deletePortfolioGeneral(
    @Query('id') id: string,
  ){
    return await this.portfolioHistoryGeneralService.deletePortfolioGeneral(id);
  }
}
