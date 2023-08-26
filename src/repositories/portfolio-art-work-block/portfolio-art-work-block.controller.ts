import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { PortfolioArtWorkBlockService } from './portfolio-art-work-block.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PortfolioArtWorkBlockCreateDto } from "./dto/portfolio-art-work-block-create.dto";
import { PortfolioArtWorkBlock } from "./portfolio-art-work-block.entity";
import { PortfolioArtWorkBlockSaveDto } from "./dto/portfolio-art-work-block-save.dto";

@Controller('portfolio-art-work-block')
@ApiTags('포트폴리오 작품 블록')
export class PortfolioArtWorkBlockController {
  constructor(
    private portfolioArtWorkBlockService: PortfolioArtWorkBlockService,
  ) {}


  @Get('/getAll')
  @ApiOperation({
    summary: '포트폴리오 작품 전체 조회',
  })
  async getAll():Promise<PortfolioArtWorkBlock[]>{
    return await this.portfolioArtWorkBlockService.getAll();
  }

  @Get('/getBlocksByArtWorkId')
  @ApiOperation({
    summary: '포트폴리오 작품 불러오기',
  })
  async getBlocksByArtWorkId(
    @Query() portfolioArtWorkId: string
  ){
    return await this.portfolioArtWorkBlockService.getBlocksByArtWorkId(portfolioArtWorkId);
  }

  @Post('/create')
  @ApiOperation({
    summary: '포트폴리오 작품 블럭 생성',
  })
  async createPortfolioArtWorkBlock(
    @Body() createDto :PortfolioArtWorkBlockCreateDto,
  ): Promise<PortfolioArtWorkBlock>{
    return await this.portfolioArtWorkBlockService.createPortfolioArtWorkBlock(
      createDto,
    );
  }

  @Post('/save')
  @ApiOperation({
    summary: '포트폴리오 작품 블럭 수정',
  })
  async savePortfolioArtWorkBlock(
    @Body() saveDto :PortfolioArtWorkBlockSaveDto,
  ): Promise<PortfolioArtWorkBlock>{
    return await this.portfolioArtWorkBlockService.savePortfolioArtWorkBlock(
      saveDto,
    );
  }

  @Delete('/delete')
  @ApiOperation({
    summary: '포트폴리오 작품 블럭 삭제'
  })
  async deletePortfolioArtWorkBlock(
    @Query('id') id: string
  ){
    return await this.portfolioArtWorkBlockService.deletePortfolioArtWorkBlock(id);
  }


}
