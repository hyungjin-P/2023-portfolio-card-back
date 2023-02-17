import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PortfolioMainVisualTheme } from './portfolio-main-visual-theme.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PortfolioMainVisualThemeService {
  constructor(
    @InjectRepository(PortfolioMainVisualTheme)
    private portfolioMainVisualThemeRepository: Repository<PortfolioMainVisualTheme>,
  ) {}

  async create(
    portfolioMainVisualTheme: PortfolioMainVisualTheme,
  ): Promise<PortfolioMainVisualTheme> {
    const savedPortfolioMainVisualTheme =
      await this.portfolioMainVisualThemeRepository.save(
        portfolioMainVisualTheme,
      );

    if (!savedPortfolioMainVisualTheme) {
      throw new HttpException({ message: '테마 생성에 실패했습니다.' }, 200);
    }

    return savedPortfolioMainVisualTheme;
  }

  async modify(
    portfolioMainVisualTheme: PortfolioMainVisualTheme,
  ): Promise<PortfolioMainVisualTheme> {
    const modifyTarget: PortfolioMainVisualTheme =
      await this.portfolioMainVisualThemeRepository.findOne({
        where: {
          id: portfolioMainVisualTheme.id,
        },
      });

    if (!modifyTarget) {
      throw new HttpException({ message: '수정할 대상이 없습니다.' }, 200);
    }

    return await this.portfolioMainVisualThemeRepository.save(
      portfolioMainVisualTheme,
    );
  }

  async getAll(): Promise<PortfolioMainVisualTheme[]> {
    const portfolioMainVisualThemes: PortfolioMainVisualTheme[] =
      await this.portfolioMainVisualThemeRepository.find();

    if (!portfolioMainVisualThemes) {
      throw new HttpException(
        { message: '포트폴리오 메인비주얼 테마가 존재하지 않습니다. ' },
        500,
      );
    }

    return portfolioMainVisualThemes;
  }

  async getOneByRecently(
    portfolioMainVisualId: string,
  ): Promise<PortfolioMainVisualTheme> {
    const filteredPortfolioMainVisualThemes: PortfolioMainVisualTheme[] =
      await this.portfolioMainVisualThemeRepository.find({
        where: { portfolioMainVisualId },
        take: 1,
        order: {
          updatedAt: 'DESC',
        },
      });

    if (filteredPortfolioMainVisualThemes.length === 0) {
      throw new HttpException(
        { message: '포트폴리오 메인비주얼 테마가 존재하지 않습니다. ' },
        500,
      );
    }

    return filteredPortfolioMainVisualThemes[0];
  }

  async remove(portfolioMainVisualThemeId): Promise<void> {
    const removeTarget: PortfolioMainVisualTheme =
      await this.portfolioMainVisualThemeRepository.findOne({
        where: {
          id: portfolioMainVisualThemeId,
        },
      });

    if (!removeTarget) {
      throw new HttpException(
        { message: '삭제할 포트폴리오 메인비주얼 테마가 존재하지 않습니다. ' },
        500,
      );
    }

    await this.portfolioMainVisualThemeRepository.remove(removeTarget);
  }
}
