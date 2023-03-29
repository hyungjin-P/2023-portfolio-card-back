import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('portfolio_history_education_year_content')
export class PortfolioHistoryEducationYearContent extends CommonEntity {
  @Column()
  portfolioHistoryEducationYearId: string;

  @Column()
  content: string;
}
