import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { PortfolioMainVisual } from '../portfolio-main-visual/portfolio-main-visual.entity';

@Entity('portfolio_main_visual_theme')
export class PortfolioMainVisualTheme extends CommonEntity {
  @Column()
  portfolioMainVisualId: string;

  @Column({nullable: true})
  controllerClass: string;

  @Column({nullable: true})
  shareButtonClass: string;

  @Column({nullable: true})
  titleClass: string;

  @Column({nullable: true})
  subTitleClass: string;

  @Column({nullable: true})
  tagClass: string;

  @ManyToOne(
    () => PortfolioMainVisual,
    (mainVisual) => mainVisual.portfolioMainVisualThemes,
  )
  portfolioMainVisual: PortfolioMainVisual;
}
