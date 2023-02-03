import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Portfolio } from '../portfolio/portfolio.entity';
import { PortfolioMainVisual } from '../portfolio-main-visual/portfolio-main-visual.entity';

@Entity('portfolio_main_visual_tag')
export class PortfolioMainVisualTag extends CommonEntity {
  @Column()
  portfolioMainVisualId: string;

  @Column()
  content: string;

  @ManyToOne(
    () => PortfolioMainVisual,
    (mainVisual) => mainVisual.portfolioMainVisualTags,
  )
  portfolioMainVisual: PortfolioMainVisual;
}
