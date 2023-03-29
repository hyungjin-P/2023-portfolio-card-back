import { CommonEntity } from '../common/common.entity';
import { Entity } from 'typeorm';

@Entity('portfolio_History_award_year_content')
export class PortfolioHistoryAwardYearContent extends CommonEntity {

  portfolioHistoryAwardYear: string;
}
