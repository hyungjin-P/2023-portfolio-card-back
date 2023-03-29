import { CommonEntity } from '../common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('portfolio_history_education_year')
export class PortfolioHistoryEducationYear extends CommonEntity {

  @Column()
  portfolioHistoryEducationId: string;
}
