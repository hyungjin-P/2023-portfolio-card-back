import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { PortfolioMainVisual } from '../portfolio-main-visual/portfolio-main-visual.entity';
import { CommonEntity } from '../common/common.entity';
import { PortfolioArtWork } from '../portfolio-art-work/portfolio-art-work.entity';
import { PortfolioHistory } from '../portfolio-history/portfolio-history.entity';

@Entity('portfolio')
export class Portfolio extends CommonEntity {
  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (entity) => entity.portfolios)
  user: User;

  @OneToMany(() => PortfolioHistory, (entity) => entity.portfolio)
  portfolioHistory: PortfolioHistory[];

  @OneToMany(() => PortfolioMainVisual, (entity) => entity.portfolio)
  portfolioMainVisuals: PortfolioMainVisual[];

  @OneToMany(() => PortfolioArtWork, (entity) => entity.portfolio)
  portfolioArtWorks: PortfolioArtWork[];
}
