import { Body, Controller, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from './portfolio.entity';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioCreateNewPortfolioDto } from './dto/portfolio.create.new.portfolio.dto';

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
        authorId: '사용자 id',
        title: '포트폴리오 타이틀',
        description: '포트폴리오 내용',
      },
    },
  })
  async createPortfolio(@Body() portfolio: Portfolio): Promise<Portfolio> {
    return await this.portfolioService.savePortfolio(portfolio);
  }

  @Post('/createNewPortfolio')
  @ApiOperation({
    summary: '포트폴리오 없는지 검사 후 없으면 새로 생성',
    description:
      '포트폴리오가 없으면 새로 생성, ' +
      '있으면 기존 생성된 내용 중 최근 1건 리턴',
  })
  @ApiCreatedResponse({
    description: `포트폴리오 추가`,
    schema: {
      example: {
        authorId: '사용자 id',
        title: '포트폴리오 타이틀',
        description: '포트폴리오 내용',
      },
    },
  })
  async createNewPortfolio(
    @Body() portfolioCreateNewPortfolioDto: PortfolioCreateNewPortfolioDto,
  ): Promise<void | Portfolio> {
    return await this.portfolioService.createNewPortfolio(
      portfolioCreateNewPortfolioDto,
    );
  }
}
