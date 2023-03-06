import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PortfolioMainVisual } from './portfolio-main-visual.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioMainVisualSaveInItemDto } from './dto/portfolio-main-visual-save-in-item.dto';
import { PortfolioMainVisualTag } from '../portfolio-main-visual-tag/portfolio-main-visual-tag.entity';

@Injectable()
export class PortfolioMainVisualService {
  constructor(
    @InjectRepository(PortfolioMainVisual)
    private portfolioMainVisualRepository: Repository<PortfolioMainVisual>,
    @InjectRepository(PortfolioMainVisualTag)
    private portfolioMainVisualTagRepository: Repository<PortfolioMainVisualTag>,
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
        500,
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
        { message: '포트폴리오 대표화면이 존재하지 않습니다. ' },
        500,
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
        { message: '포트폴리오 메인 비주얼 생성 실패' },
        500,
      );
    }

    return savedPortfolioMainVisual;
  }

  /* 메인 비주얼 저장 */
  async saveMainVisualAndInItem(
    portfolioMainVisualSaveInItemDto: PortfolioMainVisualSaveInItemDto,
  ): Promise<PortfolioMainVisual> {
    const portfolioMainVisual: PortfolioMainVisual = new PortfolioMainVisual();
    portfolioMainVisual.portfolioId =
      portfolioMainVisualSaveInItemDto.portfolioId;
    portfolioMainVisual.nickName = portfolioMainVisualSaveInItemDto.nickName;
    portfolioMainVisual.name = portfolioMainVisualSaveInItemDto.name;
    portfolioMainVisual.mainVisualUrl =
      portfolioMainVisualSaveInItemDto.mainVisualUrl;
    portfolioMainVisual.subTitle = portfolioMainVisualSaveInItemDto.subTitle;

    if (portfolioMainVisualSaveInItemDto.mainVisualId) {
      portfolioMainVisual.id = portfolioMainVisualSaveInItemDto.mainVisualId;

      const oldTags = await this.portfolioMainVisualTagRepository.find({
        where: {
          portfolioMainVisualId: portfolioMainVisual.id,
        },
      });

      /* 기존 태그 삭제 */
      if (oldTags) {
        await this.portfolioMainVisualTagRepository.remove(oldTags);
      }
    }

    /* 저장한 포트폴리오 */
    const savedPortfolioMainVisual =
      await this.portfolioMainVisualRepository.save(portfolioMainVisual);

    if (!savedPortfolioMainVisual) {
      throw new HttpException({ message: '메인 비주얼 저장 실패' }, 500);
    }

    const portfolioMainVisualTags: PortfolioMainVisualTag[] =
      portfolioMainVisualSaveInItemDto.portfolioMainVisualTags;

    let savedPortfolioMainVisualTags: PortfolioMainVisualTag[];

    if (portfolioMainVisualTags) {
      for (const tag of portfolioMainVisualTags) {
        tag.portfolioMainVisualId = savedPortfolioMainVisual.id;
      }

      /* 저장한 태그 */
      savedPortfolioMainVisualTags =
        await this.portfolioMainVisualTagRepository.save(
          portfolioMainVisualTags,
        );
    }

    savedPortfolioMainVisual.portfolioMainVisualTags = [
      ...savedPortfolioMainVisualTags,
    ];

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
        500,
      );
    }
    await this.portfolioMainVisualRepository.remove(portfolioMainVisual);
  }
}
