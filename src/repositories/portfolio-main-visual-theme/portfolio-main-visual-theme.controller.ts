import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioMainVisualThemeService } from './portfolio-main-visual-theme.service';
import { PortfolioMainVisualTheme } from './portfolio-main-visual-theme.entity';
import { PortfolioMainVisualThemeEntityDto } from './portfolio-main-visual-theme.entity.dto';

@Controller('portfolio-main-visual-theme')
@ApiTags('포트폴리오 메인 비주얼 테마')
export class PortfolioMainVisualThemeController {
  constructor(
    private portfolioMainVisualThemeService: PortfolioMainVisualThemeService,
  ) {}

  @Post('/create')
  @ApiOperation({
    summary: '포트폴리오 메인비주얼 테마 추가',
  })
  async create(
    @Body()
    portfolioMainVisualThemeEntityDto: PortfolioMainVisualThemeEntityDto,
  ): Promise<PortfolioMainVisualTheme> {
    return await this.portfolioMainVisualThemeService.create(
      portfolioMainVisualThemeEntityDto,
    );
  }

  @Get('/getAll')
  @ApiOperation({
    summary: '포트폴리오 메인비주얼 테마 전체 조회',
  })
  async getAll(): Promise<PortfolioMainVisualTheme[]> {
    return await this.portfolioMainVisualThemeService.getAll();
  }

  @Get('/getOneByRecently')
  @ApiOperation({
    summary: '포트폴리오 메인비주얼 최근 것 1개 조회',
  })
  async findOneByRecent(
    @Query('portfolioMainVisualId') portfolioMainVisualId: string,
  ): Promise<PortfolioMainVisualTheme> {
    return await this.portfolioMainVisualThemeService.getOneByRecently(
      portfolioMainVisualId,
    );
  }

  @Delete('/remove')
  @ApiOperation({
    summary: '포트폴리오 메인비주얼 해당 1건 삭제',
  })
  async remove(@Query('id') id: string): Promise<void> {
    await this.portfolioMainVisualThemeService.remove(id);
  }

  @Patch('/modify')
  async modify(
    @Body()
    portfolioMainVisualThemeEntityDto: PortfolioMainVisualThemeEntityDto,
  ): Promise<PortfolioMainVisualTheme> {
    return await this.portfolioMainVisualThemeService.modify(
      portfolioMainVisualThemeEntityDto,
    );
  }
}
