import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { PortfolioHistoryContactService } from "./portfolio-history-contact.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PortfolioHistoryContact } from "./portfolio-history-contact.entity";

@Controller('portfolio-history-contact')
@ApiTags('포트폴리오 연락처')
export class PortfolioHistoryContactController {
  constructor(private portfolioHistoryContactService: PortfolioHistoryContactService) {}

  @Get('/getAll')
  @ApiOperation({
    summary: '포트폴리오 연락처 전체 조회'
  })
  async getAllPortfolioContact(): Promise<PortfolioHistoryContact[]>{
    return await this.portfolioHistoryContactService.getAll();
  }

  @Post('/create')
  @ApiOperation({
    summary: '포트폴리오 연락처 추가'
  })
  async createPortfolioContact(
    @Query('portfolioHistoryId') portfolioHistoryId: string,
  ): Promise<PortfolioHistoryContact>{
    return await this.portfolioHistoryContactService.createPortfolioContact(portfolioHistoryId);
  }

  @Post('/save')
  @ApiOperation({
    summary: '포트폴리오 연락처 수정'
  })
  async savePortfolioContact(
    @Body() portfolioHistoryContact: PortfolioHistoryContact
  ): Promise<PortfolioHistoryContact>{
    return await this.portfolioHistoryContactService.savePortfolioContact(portfolioHistoryContact);
  }

}
