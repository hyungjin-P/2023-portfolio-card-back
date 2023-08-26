import { Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PortfolioHistoryService } from "./portfolio-history.service";
import { PortfolioHistory } from "./portfolio-history.entity";

@Controller('portfolio-history')
@ApiTags('작기이력')
export class PortfolioHistoryController {
  constructor(private portfolioHistoryService: PortfolioHistoryService) {
  }

  @Post('/create')
  @ApiOperation({
    summary: '포트폴리오 작가 정보 생성'
  })
  async createPortfolioHistory(
    @Query('portfolioId') portfolioId: string,
  ): Promise<PortfolioHistory>{
    return await this.portfolioHistoryService.createPortfolioHistory(portfolioId);
  }

  @Get('/getAllHistoryByPortfolioId')
  async getAllHistoryById(
    @Query('portfolioId') portfolioId: string
  ): Promise<PortfolioHistory>{
    return await this.portfolioHistoryService.getAllHistoryByPortfolioId(portfolioId);
  }

}
