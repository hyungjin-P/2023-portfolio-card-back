import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Portfolio } from '../portfolio/portfolio.entity';
import { CommonEntity } from '../common/common.entity';
import { PortfolioMainVisualTag } from '../portfolio-main-visual-tag/portfolio-main-visual-tag.entity';
import { PortfolioMainVisualTheme } from '../portfolio-main-visual-theme/portfolio-main-visual-theme.entity';

@Entity('portfolio_main_visual')
export class PortfolioMainVisual extends CommonEntity {
  @Column()
  portfolioId: string;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  mainVisualUrl: string;

  @Column({nullable: true})
  nickName: string;

  @Column({nullable: true})
  subTitle: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.portfolioMainVisuals)
  portfolio: Portfolio;

  @OneToMany(() => PortfolioMainVisualTag, (tag) => tag.portfolioMainVisual)
  portfolioMainVisualTags: PortfolioMainVisualTag[];

  @OneToMany(
    () => PortfolioMainVisualTheme,
    (theme) => theme.portfolioMainVisual,
  )
  portfolioMainVisualThemes: PortfolioMainVisualTheme[];
}
