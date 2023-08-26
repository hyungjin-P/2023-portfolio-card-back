import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioArtWork } from './portfolio-art-work.entity';
import { Repository } from 'typeorm';
import { PortfolioArtWorkBlock } from '../portfolio-art-work-block/portfolio-art-work-block.entity';
import { PortfolioArtWorkPicture } from '../portfolio-art-work-picture/portfolio-art-work-picture.entity';
import { Author } from '../author/author.entity';
import { Portfolio } from '../portfolio/portfolio.entity';

@Injectable()
export class PortfolioArtWorkService {
  constructor(
    @InjectRepository(PortfolioArtWork)
    private portfolioArtWorkRepository: Repository<PortfolioArtWork>,
    @InjectRepository(PortfolioArtWorkBlock)
    private portfolioArtWorkBlockRepository: Repository<PortfolioArtWorkBlock>,
    @InjectRepository(PortfolioArtWorkPicture)
    private portfolioArtWorkPictureRepository: Repository<PortfolioArtWorkPicture>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async getAll() {
    const portfolioArtWorks: PortfolioArtWork[] = await this.portfolioArtWorkRepository.find(
      {
        relations: {
          portfolioArtWorkBlocks: true,
        },
        order: {
          createdAt: 'DESC',
        },
      }
    );

    return portfolioArtWorks;
  }

  async initArtwork(authorId: string): Promise<PortfolioArtWork> {
    const recentPortfolios: Portfolio[] = await this.portfolioRepository.find({
      where: {
        authorId,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    let recentPortfolio: Portfolio;

    if (recentPortfolios.length === 0) {
      recentPortfolio = await this.portfolioRepository.save({
        authorId,
        title: '',
        description: '',
      });
    } else {
      recentPortfolio = recentPortfolios[0];
    }

    const portfolioArtWorks: PortfolioArtWork =
      await this.portfolioArtWorkRepository.findOne({
        where: {
          portfolioId: recentPortfolio.id,
        },
        relations: {
          portfolioArtWorkBlocks: {
            portfolioArtWorkPictures: true
          },
        },
        order: {
          portfolioArtWorkBlocks: {
            sortNumber: 'ASC',
          },
        },
      });

    let resultPortfolioArtWork: PortfolioArtWork;

    if (!portfolioArtWorks) {
      const savedPortfolioArtWork = await this.portfolioArtWorkRepository.save({
        portfolioId: recentPortfolio.id,
      });

      resultPortfolioArtWork = await this.portfolioArtWorkRepository.findOne({
        where: {
          id: savedPortfolioArtWork.id,
        },
        relations: {
          portfolioArtWorkBlocks: {
            portfolioArtWorkPictures: true
          },
        },
      });
    } else {
      resultPortfolioArtWork = portfolioArtWorks;
    }

    return resultPortfolioArtWork;
  }
}
