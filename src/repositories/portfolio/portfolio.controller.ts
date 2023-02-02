import { Body, Controller, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from './portfolio.entity';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Controller('portfolio')
@ApiTags('포트폴리오')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Post('/create')
  @ApiOperation({
    summary: '포트폴리오 추가',
    description: '포트폴리오 추가',
  })
  @ApiCreatedResponse({
    description: `포트폴리오 추가`,
    schema: {
      example: {
        userId: '사용자 id',
        title: '포트폴리오 타이틀',
        description: '포트폴리오 내용',
      },
    },
  })
  async createPortfolio(@Body() portfolio: Portfolio): Promise<Portfolio> {
    return await this.portfolioService.savePortfolio(portfolio);
  }

}
