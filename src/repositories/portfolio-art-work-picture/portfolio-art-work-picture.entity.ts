import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PortfolioArtWork } from '../portfolio-art-work/portfolio-art-work.entity';
import { PortfolioArtWorkBlock } from '../portfolio-art-work-block/portfolio-art-work-block.entity';

@Entity('portfolio_art_work_picture')
export class PortfolioArtWorkPicture extends CommonEntity {
  @Column()
  portfolioArtWorkBlockId: string;

  @Column()
  url: string;

  @Column()
  sortNumber: number;

  @ManyToOne(
    () => PortfolioArtWorkBlock,
    (entity) => entity.portfolioArtWorkPictures,
  )
  portfolioArtWorkBlock: PortfolioArtWorkBlock;
}
