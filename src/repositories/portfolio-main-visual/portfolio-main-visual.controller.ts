import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { PortfolioMainVisualService } from './portfolio-main-visual.service';
import { PortfolioMainVisual } from './portfolio-main-visual.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioMainVisualEntityDto } from './portfolio-main-visual.entity.dto';

@Controller('portfolio-main-visual')
@ApiTags('포트폴리오 메인 비주얼')
export class PortfolioMainVisualController {
  constructor(private portfolioMainVisualService: PortfolioMainVisualService) {}

  @Post('/create')
  @ApiOperation({
    summary: '포트폴리오 메인 비주얼 추가',
  })
  async savePortfolioMainVisual(
    @Body() portfolioMainVisual: PortfolioMainVisualEntityDto,
  ): Promise<PortfolioMainVisual> {
    return await this.portfolioMainVisualService.createPortfolioMainVisual(
      portfolioMainVisual,
    );
  }

  @Get('/getAll')
  @ApiOperation({
    summary: '포트폴리오 메인 비주얼 전체 조회',
  })
  async getAll(): Promise<PortfolioMainVisual[]> {
    return await this.portfolioMainVisualService.getAll();
  }

  @Get('/findOne')
  @ApiOperation({
    summary: '포트폴리오 해당 1건 조회',
    description:
      '__샘플 ID__\n\n' +
      'sample ID : 6ae6d61e-4462-4412-9ecd-394b24575795\n\n' +
      'sample ID : 6ae6d61e-4462-4412-9ecd-394b24575795',
  })
  async findOne(
    @Query('portfolioId') portfolioId: string,
  ): Promise<PortfolioMainVisual> {
    return await this.portfolioMainVisualService.findOne(portfolioId);
  }
}
