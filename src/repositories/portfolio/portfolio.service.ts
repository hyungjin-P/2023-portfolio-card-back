import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from './portfolio.entity';
import { Repository } from 'typeorm';
import { PortfolioCreateNewPortfolioDto } from './dto/portfolio.create.new.portfolio.dto';
import { assignTwoLevelsDeep } from '@nestjs/swagger/dist/utils/assign-two-levels-deep';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async getAll(): Promise<Portfolio[]> {
    return await this.portfolioRepository.find();
  }

  async getOne(userId: string): Promise<Portfolio> {
    const portfolioList = await this.portfolioRepository.find({
      where: {
        userId,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    if (!portfolioList) {
      throw new HttpException(
        { message: '포트폴리오가 존재하지 않습니다.' },
        500,
      );
    }

    return portfolioList[0];
  }

  async savePortfolio(portfolio: Portfolio): Promise<Portfolio> {
    const newPortfolio: Portfolio = await this.portfolioRepository.save(
      portfolio,
    );

    if (!newPortfolio) {
      throw new HttpException(
        { message: '포트폴리오 생성을 실패했습니다' },
        500,
      );
    }

    console.log('create portfolio ', newPortfolio);

    return newPortfolio;
  }

  async modifyPortfolio(portfolio: Portfolio): Promise<Portfolio> {
    const modifiedPortfolio = await this.portfolioRepository.save(portfolio);

    if (!modifiedPortfolio) {
      throw new HttpException(
        { message: '수정할 포트폴리오가 존재하지 않습니다.' },
        500,
      );
    }

    return modifiedPortfolio;
  }

  async deletePortfolio(portfolioId: string): Promise<void> {
    const targetPortfolio: Portfolio = await this.portfolioRepository.findOne({
      where: {
        id: portfolioId,
      },
    });

    if (!targetPortfolio) {
      throw new HttpException(
        { message: '삭제할 포트폴리오가 존재하지 않습니다.' },
        500,
      );
    }
    await this.portfolioRepository.delete({ id: targetPortfolio.id });
  }

  async createNewPortfolio(
    portfolioCreateNewPortfolioDto: PortfolioCreateNewPortfolioDto,
  ): Promise<void | Portfolio> {
    const recentPortfolios: Portfolio[] = await this.portfolioRepository.find({
      where: {
        userId: portfolioCreateNewPortfolioDto.userId,
      },
    });

    if (recentPortfolios.length > 0) {
      return recentPortfolios[0];
    }

    const portfolio: Portfolio = new Portfolio();
    portfolio.userId = portfolioCreateNewPortfolioDto.userId;

    const savedPortfolio = await this.portfolioRepository.save(portfolio);

    if (!savedPortfolio) {
      throw new HttpException(
        { message: '포트폴리오 생성을 실패했습니다.' },
        500,
      );
    }

    return savedPortfolio;
  }
}
