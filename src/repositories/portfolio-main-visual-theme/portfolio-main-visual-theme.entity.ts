import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { PortfolioMainVisual } from '../portfolio-main-visual/portfolio-main-visual.entity';

@Entity('portfolio_main_visual_theme')
export class PortfolioMainVisualTheme extends CommonEntity {
  @Column()
  portfolioMainVisualId: string;

  @Column()
  controllerClass: string;

  @Column()
  shareButtonClass: string;

  @Column()
  titleClass: string;

  @Column()
  subTitleClass: string;

  @Column()
  tagClass: string;

  @ManyToOne(
    () => PortfolioMainVisual,
    (mainVisual) => mainVisual.portfolioMainVisualThemes,
  )
  portfolioMainVisual: PortfolioMainVisual;
}
