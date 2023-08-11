import { Body, Controller, Post, Query } from "@nestjs/common";
import { PortfolioHistoryGeneralService } from "./portfolio-history-general.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('portfolio-history-general')
@ApiTags('포트폴리오 기본정보')
export class PortfolioHistoryGeneralController {
  constructor(private portfolioHistoryGeneralService: PortfolioHistoryGeneralService) {}

  @Post('/create')
  @ApiOperation({
    summary: '포트폴리오 기본 정보 추가'
  })
  async savePortfolioGeneral(
    @Query('portfolioHistoryId') portfolioHistoryId: string,
    @Query('imageUrl') imageUrl: string,
  ){
  }

}
