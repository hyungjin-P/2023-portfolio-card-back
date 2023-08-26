import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Author } from '../author/author.entity';
import { PortfolioMainVisual } from '../portfolio-main-visual/portfolio-main-visual.entity';
import { CommonEntity } from '../common/common.entity';
import { PortfolioArtWork } from '../portfolio-art-work/portfolio-art-work.entity';
import { PortfolioHistory } from '../portfolio-history/portfolio-history.entity';

@Entity('portfolio')
export class Portfolio extends CommonEntity {
  @Column()
  authorId: string;

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  description: string;

  @ManyToOne(() => Author, (entity) => entity.portfolios)
  author: Author;

  @OneToMany(() => PortfolioHistory, (entity) => entity.portfolio)
  portfolioHistories: PortfolioHistory[];

  @OneToMany(() => PortfolioMainVisual, (entity) => entity.portfolio)
  portfolioMainVisuals: PortfolioMainVisual[];

  @OneToMany(() => PortfolioArtWork, (entity) => entity.portfolio)
  portfolioArtWorks: PortfolioArtWork[];
}
