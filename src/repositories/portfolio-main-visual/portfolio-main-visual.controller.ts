import { Body, Controller, Post, Req } from '@nestjs/common';
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
    summary: '포트폴리오 메인비주얼 추가',
  })
  async savePortfolioMainVisual(
    @Body() portfolioMainVisual: PortfolioMainVisualEntityDto,
  ): Promise<PortfolioMainVisual> {
    return await this.portfolioMainVisualService.createPortfolioMainVisual(
      portfolioMainVisual,
    );
  }
}
