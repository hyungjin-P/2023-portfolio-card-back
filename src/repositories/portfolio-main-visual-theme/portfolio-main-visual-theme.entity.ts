import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

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
}
