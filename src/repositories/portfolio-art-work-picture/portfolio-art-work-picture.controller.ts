import { Body, Controller, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PortfolioArtWorkPictureService } from "./portfolio-art-work-picture.service";
import { PortfolioArtWorkPictureModifySortDto } from "./dto/portfolio-art-work-picture-modify-sort.dto";
import { PortfolioArtWorkPicture } from "./portfolio-art-work-picture.entity";
import { setTSInstanceInCache } from "ts-loader/dist/instance-cache";
import { PortfolioArtWorkPictureSaveDto } from "./dto/portfolio-art-work-picture-save.dto";

@Controller('portfolio-art-work-picture')
@ApiTags('포트폴리오 작품 사진')
export class PortfolioArtWorkPictureController {
  constructor(private portfolioArtWorkPictureService: PortfolioArtWorkPictureService) {}

  @Post('/create')
  @ApiOperation({
    summary: '포트폴리오 사진 추가',
  })
  async createPortfolioArtWorkPicture(
    @Body() picturesInfo: PortfolioArtWorkPictureSaveDto,
  ): Promise<PortfolioArtWorkPicture>{
    return await this.portfolioArtWorkPictureService.createPortfolioArtWorkPicture(picturesInfo);
  }

  @Post('modifySortByIdDto')
  @ApiOperation({
    summary: '포트폴리오 메인 사진 수정',
  })
  async modifyPortfolioArtWorkPictureSortByIdDto(
    @Body() modifySortDto: PortfolioArtWorkPictureModifySortDto[],
  ): Promise<PortfolioArtWorkPicture[]>{
    return await this.portfolioArtWorkPictureService.modifyPortfolioArtWorkPictureSortByIdDto(modifySortDto);
  }

}
