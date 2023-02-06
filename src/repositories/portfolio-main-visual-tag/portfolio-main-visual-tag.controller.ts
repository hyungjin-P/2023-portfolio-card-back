import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { PortfolioMainVisualTagService } from './portfolio-main-visual-tag.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioMainVisualTag } from './portfolio-main-visual-tag.entity';
import { PortfolioMainVisualTagEntityDto } from './portfolio-main-visual-tag.entity.dto';
import { PortfolioMainVisual } from '../portfolio-main-visual/portfolio-main-visual.entity';

@ApiTags('포트폴리오 메인 비주얼 태그')
@Controller('portfolio-main-visual-tag')
export class PortfolioMainVisualTagController {
  constructor(
    private portfolioMainVisualTagService: PortfolioMainVisualTagService,
  ) {}

  @Post('/create')
  @ApiOperation({
    summary: '포트폴리오 메인 비주얼 태그 생성',
  })
  async create(
    @Body() portfolioMainVisualTagEntityDto: PortfolioMainVisualTagEntityDto,
  ): Promise<PortfolioMainVisualTag> {
    return await this.portfolioMainVisualTagService.create(
      portfolioMainVisualTagEntityDto,
    );
  }

  @Delete('/remove')
  @ApiOperation({
    summary: '포트폴리오 메인 비주얼 태그 삭제',
  })
  async remove(@Query('id') id: string): Promise<void> {
    await this.portfolioMainVisualTagService.remove(id);
  }
}
