import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PortfolioMainVisualTag } from './portfolio-main-visual-tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PortfolioMainVisualTagService {
  constructor(
    @InjectRepository(PortfolioMainVisualTag)
    private portfolioMainVisualTagRepository: Repository<PortfolioMainVisualTag>,
  ) {}

  async create(
    portfolioMainVisualTag: PortfolioMainVisualTag,
  ): Promise<PortfolioMainVisualTag> {
    const t = await this.portfolioMainVisualTagRepository.save(
      portfolioMainVisualTag,
    );
    return t;
  }

  async remove(id: string): Promise<void> {
    const target: PortfolioMainVisualTag =
      await this.portfolioMainVisualTagRepository.findOne({
        where: { id },
      });

    if (!target) {
      throw new HttpException({ message: '삭제할 태그가 없습니다.' }, 200);
    }

    await this.portfolioMainVisualTagRepository.remove(target);
  }
}
