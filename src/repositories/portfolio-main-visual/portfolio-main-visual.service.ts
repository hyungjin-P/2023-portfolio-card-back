import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PortfolioMainVisual } from './portfolio-main-visual.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PortfolioMainVisualService {
  constructor(
    @InjectRepository(PortfolioMainVisual)
    private portfolioMainVisualRepository: Repository<PortfolioMainVisual>,
  ) {}

  async findAllPortfolioMainVisual(
    portfolioId: string,
  ): Promise<PortfolioMainVisual[]> {
    const portfolioMainVisualList: PortfolioMainVisual[] =
      await this.portfolioMainVisualRepository.find({
        where: {
          portfolioId,
        },
      });

    if (!portfolioMainVisualList) {
      throw new HttpException(
        { message: '포트폴링 메인이 존재하지 않습니다. ' },
        200,
      );
    }

    return portfolioMainVisualList;
  }

  async createPortfolioMainVisual(
    portfolioMainVisual: PortfolioMainVisual,
  ): Promise<PortfolioMainVisual> {
    const savedPortfolioMainVisual: PortfolioMainVisual =
      await this.portfolioMainVisualRepository.save(portfolioMainVisual);

    if (!savedPortfolioMainVisual) {
      throw new HttpException(
        { message: '포트폴리오 메인 비주얼이 존재하지 않습니다.' },
        200,
      );
    }

    return savedPortfolioMainVisual;
  }

  async deletePortfolioMainVisual(
    portfolioMainVisualId: string,
  ): Promise<void> {
    const portfolioMainVisual: PortfolioMainVisual =
      await this.portfolioMainVisualRepository.findOne({
        where: { id: portfolioMainVisualId },
      });

    if (!portfolioMainVisual) {
      throw new HttpException(
        { message: '삭제할 포트폴리오가 존재하지 않습니다.' },
        200,
      );
    }
    await this.portfolioMainVisualRepository.delete(portfolioMainVisual);
  }
}
