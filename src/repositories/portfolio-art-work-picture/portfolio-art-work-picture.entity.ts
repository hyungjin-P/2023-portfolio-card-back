import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PortfolioArtWorkBlock } from '../portfolio-art-work-block/portfolio-art-work-block.entity';

@Entity('portfolio_art_work_picture')
export class PortfolioArtWorkPicture extends CommonEntity {
  @Column()
  portfolioArtWorkBlockId: string;

  @Column()
  url: string;

  @Column({default: 0})
  sortNumber: number;

  @ManyToOne(
    () => PortfolioArtWorkBlock,
    (entity) => entity.portfolioArtWorkPictures,
  )
  portfolioArtWorkBlock: PortfolioArtWorkBlock;
}
