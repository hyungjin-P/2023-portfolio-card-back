import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from '../portfolio/portfolio.entity';
import { CommonEntity } from '../common/common.entity';
import { PortfolioMainVisualTag } from '../portfolio-main-visual-tag/portfolio-main-visual-tag.entity';

@Entity('portfolio_main_visual')
export class PortfolioMainVisual extends CommonEntity {
  @Column()
  portfolioId: string;

  @Column()
  name: string;

  @Column()
  mainVisualUrl: string;

  @Column()
  nickName: string;

  @Column()
  subTitle: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.portfolioMainVisuals)
  portfolio: Portfolio;

  @OneToMany(() => PortfolioMainVisualTag, (tag) => tag.portfolioMainVisual)
  portfolioMainVisualTags: PortfolioMainVisualTag[];
}
