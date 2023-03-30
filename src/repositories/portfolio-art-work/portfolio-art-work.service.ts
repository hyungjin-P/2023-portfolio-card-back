import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioArtWork } from './portfolio-art-work.entity';
import { Repository } from 'typeorm';
import { PortfolioArtWorkBlock } from '../portfolio-art-work-block/portfolio-art-work-block.entity';
import { PortfolioArtWorkPicture } from '../portfolio-art-work-picture/portfolio-art-work-picture.entity';
import { User } from '../user/user.entity';
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
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async initArtwork(userId: string): Promise<PortfolioArtWork> {
    const recentPortfolios: Portfolio[] = await this.portfolioRepository.find({
      where: {
        userId,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    let recentPortfolio: Portfolio;

    if (recentPortfolios.length === 0) {
      recentPortfolio = await this.portfolioRepository.save({
        userId,
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
        order: {
          updatedAt: 'DESC',
        },
      });

    let resultPortfolioArtWork: PortfolioArtWork;

    if (portfolioArtWorks.length === 0) {
      resultPortfolioArtWork = await this.portfolioArtWorkRepository.save({
        portfolioId: recentPortfolio.id,
      });
    } else {
      resultPortfolioArtWork = portfolioArtWorks[0];
    }

    return resultPortfolioArtWork;
  }
}
