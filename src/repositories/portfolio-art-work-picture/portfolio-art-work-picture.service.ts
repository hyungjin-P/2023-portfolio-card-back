import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { PortfolioArtWorkPicture } from './portfolio-art-work-picture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioArtWorkPictureModifySortDto } from "./dto/portfolio-art-work-picture-modify-sort.dto";
import { PortfolioArtWorkPictureSaveDto } from "./dto/portfolio-art-work-picture-save.dto";

@Injectable()
export class PortfolioArtWorkPictureService {
  constructor(
    @InjectRepository(PortfolioArtWorkPicture)
    private portfolioArtWorkPicture: Repository<PortfolioArtWorkPicture>,
  ) {}


  async createPortfolioArtWorkPicture(picturesInfo: PortfolioArtWorkPictureSaveDto): Promise<PortfolioArtWorkPicture> {
    const createdPicture: PortfolioArtWorkPicture = await this.portfolioArtWorkPicture.save(picturesInfo);

    if(!createdPicture){
      throw new HttpException(
        { message: '블럭 이미지 저장 실패'},
        500
      );
    }

    return createdPicture;
  }

  async modifyPortfolioArtWorkPictureSortByIdDto(modifySortDto: PortfolioArtWorkPictureModifySortDto[])
    : Promise<PortfolioArtWorkPicture[]> {
    const modifyPictures:PortfolioArtWorkPicture[] = await this.portfolioArtWorkPicture.save(modifySortDto);

    if(modifyPictures.length === 0){
      throw new HttpException(
        { message: '블럭 이미지 순서 변경 실패'},
        500
      );
    }

    return modifyPictures;
  }
}
