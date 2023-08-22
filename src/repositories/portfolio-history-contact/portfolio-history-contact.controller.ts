import { Body, Controller, Post, Query } from "@nestjs/common";
import { PortfolioHistoryContactService } from "./portfolio-history-contact.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('portfolio-history-contact')
@ApiTags('포트폴리오 연락처')
export class PortfolioHistoryContactController {
  constructor(private portfolioHistoryContactService: PortfolioHistoryContactService) {}

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
