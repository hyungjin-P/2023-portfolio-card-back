import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PortfolioArtWork } from '../portfolio-art-work/portfolio-art-work.entity';
import { PortfolioArtWorkPicture } from '../portfolio-art-work-picture/portfolio-art-work-picture.entity';

@Entity('portfolio_art_work_block')
export class PortfolioArtWorkBlock extends CommonEntity {
  @Column()
  portfolioArtWorkId: string;

  @Column()
  blockType: string;

  @Column()
  sortNumber: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  visibility: boolean;

  @ManyToOne(() => PortfolioArtWork, (entity) => entity.portfolioArtWorks)
  portfolioArtWork: PortfolioArtWork;

  @OneToMany(
    () => PortfolioArtWorkPicture,
    (entity) => entity.portfolioArtWorkBlock,
  )
  portfolioArtWorkPictures: PortfolioArtWorkPicture[];
}
