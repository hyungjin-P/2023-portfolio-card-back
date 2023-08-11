import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioArtWorkService } from './portfolio-art-work.service';
import { PortfolioArtWork } from './portfolio-art-work.entity';

@Controller('portfolio-art-work')
@ApiTags('포트폴리오 작품')
export class PortfolioArtWorkController {
  constructor(private portfolioArtWorkService: PortfolioArtWorkService) {}

  @Get('/init')
  @ApiOperation({
    summary: '사용자 작품 세팅',
    description:
      `사용자 작품 리턴\n\n` + `이전 진행 중인 작품 리턴, 없으면 새로 생성`,
  })
  async initArtWork(
    @Query('authorId') authorId: string,
  ): Promise<PortfolioArtWork> {
    return await this.portfolioArtWorkService.initArtwork(authorId);
  }
}
