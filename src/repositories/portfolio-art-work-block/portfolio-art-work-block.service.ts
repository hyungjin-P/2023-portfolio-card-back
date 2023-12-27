import { HttpException, Injectable } from "@nestjs/common";
import { PortfolioArtWorkBlock } from './portfolio-art-work-block.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioArtWorkBlockCreateDto } from "./dto/portfolio-art-work-block-create.dto";
import { PortfolioArtWorkBlockSaveDto } from "./dto/portfolio-art-work-block-save.dto";
import { PortfolioArtWorkPictureService } from "../portfolio-art-work-picture/portfolio-art-work-picture.service";


@Injectable()
export class PortfolioArtWorkBlockService {
  constructor(
    @InjectRepository(PortfolioArtWorkBlock)
    private portfolioArtWorkBlockRepository: Repository<PortfolioArtWorkBlock>,
    private portfolioArtWorkBlockPictureService: PortfolioArtWorkPictureService,
  ) {
  }

  async getAll() {
    return await this.portfolioArtWorkBlockRepository.find(
      {
        relations: {
          portfolioArtWorkPictures: true,
        }
      }
    );
  }

  async getBlocksByArtWorkId(portfolioArtWorkId: string) {
    return await this.portfolioArtWorkBlockRepository.find(
      {
        where: {
          portfolioArtWorkId: portfolioArtWorkId,
        },
        relations: {
          portfolioArtWorkPictures: true,
        }
      }
    );
  }

  async createPortfolioArtWorkBlock(createDto: PortfolioArtWorkBlockCreateDto): Promise<PortfolioArtWorkBlock> {
    const createdPortfolioArtWorkBlock = await this.portfolioArtWorkBlockRepository.save(createDto);

    if(!createdPortfolioArtWorkBlock){
      throw new HttpException(
        { message: '포트폴리오 작품 블럭 생성 실패' },
        500,
      );
    }

    return createdPortfolioArtWorkBlock;
  }

  async savePortfolioArtWorkBlock(saveDto: PortfolioArtWorkBlockSaveDto): Promise<PortfolioArtWorkBlock> {
    const savedPortfolioArtWorkBlock = await this.portfolioArtWorkBlockRepository.save(saveDto);

    if(!savedPortfolioArtWorkBlock){
      throw new HttpException(
        { message: '포트폴리오 작품 블럭 수정 실패' },
        500,
      );
    }

    return savedPortfolioArtWorkBlock;
  }

  async deletePortfolioArtWorkBlock(id: string) {
    await this.portfolioArtWorkBlockPictureService.deletePortfolioArtWorkPictureByBlockId(id);

    return await this.portfolioArtWorkBlockRepository.delete(id);
  }
}
