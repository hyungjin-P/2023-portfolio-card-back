import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Portfolio } from '../portfolio/portfolio.entity';

@Entity('portfolio_art_work')
export class PortfolioArtWork extends CommonEntity {
  @Column()
  portfolioId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Portfolio, (entity) => entity.portfolioArtWorks)
  portfolio: Portfolio;

  @OneToMany(() => PortfolioArtWork, (entity) => entity.portfolio)
  portfolioArtWorks: PortfolioArtWork[];
}
