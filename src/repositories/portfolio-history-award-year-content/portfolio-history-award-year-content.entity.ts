import { CommonEntity } from '../common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('portfolio_history_award_year_content')
export class PortfolioHistoryAwardYearContent extends CommonEntity {
  @Column()
  portfolioHistoryAwardYear: string;

  @Column({nullable: true})
  content: string;
}
