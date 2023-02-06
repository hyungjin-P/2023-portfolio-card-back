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

  async getAll(): Promise<PortfolioMainVisual[]> {
    const portfolioMainVisualList: PortfolioMainVisual[] =
      await this.portfolioMainVisualRepository.find({
        relations: {
          portfolioMainVisualTags: true,
          portfolioMainVisualThemes: true,
        },
      });

    if (!portfolioMainVisualList) {
      throw new HttpException(
        { message: '포트폴리오 메인이 존재하지 않습니다. ' },
        200,
      );
    }

    return portfolioMainVisualList;
  }

  async findOne(portfolioId: string): Promise<PortfolioMainVisual> {
    const portfolioMainVisualList: PortfolioMainVisual[] =
      await this.portfolioMainVisualRepository.find({
        where: {
          portfolioId,
        },
        relations: {
          portfolioMainVisualTags: true,
          portfolioMainVisualThemes: true,
        },
        order: {
          updatedAt: 'DESC',
          portfolioMainVisualThemes: {
            createdAt: 'DESC',
          },
        },
      });

    if (!portfolioMainVisualList) {
      throw new HttpException(
        { message: '포트폴리오 메인이 존재하지 않습니다. ' },
        200,
      );
    }

    if (portfolioMainVisualList[0].portfolioMainVisualThemes.length > 0) {
      const firstPortfolioMainVisual =
        portfolioMainVisualList[0].portfolioMainVisualThemes[0];

      portfolioMainVisualList[0].portfolioMainVisualThemes = [
        firstPortfolioMainVisual,
      ];
    }

    return portfolioMainVisualList[0];
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
    await this.portfolioMainVisualRepository.remove(portfolioMainVisual);
  }
}
