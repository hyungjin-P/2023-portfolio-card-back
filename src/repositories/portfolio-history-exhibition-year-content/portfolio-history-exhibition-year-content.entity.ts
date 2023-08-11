import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('portfolio_history_exhibition_year_content')
export class PortfolioHistoryExhibitionYearContent extends CommonEntity {
  @Column()
  portfolioHistoryExhibitionYearId: number;

  @Column({nullable: true})
  content: string;
}
