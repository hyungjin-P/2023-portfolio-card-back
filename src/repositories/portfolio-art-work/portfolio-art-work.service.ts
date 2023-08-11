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

    const portfolioArtWorks: PortfolioArtWork[] =
      await this.portfolioArtWorkRepository.find({
        where: {
          portfolioId: recentPortfolio.id,
        },
        relations: {
          portfolioArtWorkBlocks: true,
        },
        order: {
          updatedAt: 'DESC',
        },
      });

    let resultPortfolioArtWork: PortfolioArtWork;

    if (portfolioArtWorks.length === 0) {
      const savedPortfolioArtWork = await this.portfolioArtWorkRepository.save({
        portfolioId: recentPortfolio.id,
      });

      resultPortfolioArtWork = await this.portfolioArtWorkRepository.findOne({
        where: {
          id: savedPortfolioArtWork.id,
        },
        relations: {
          portfolioArtWorkBlocks: true,
        },
      });
    } else {
      resultPortfolioArtWork = portfolioArtWorks[0];
    }

    return resultPortfolioArtWork;
  }
}
