import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('portfolio_history_education')
export class PortfolioHistoryEducation extends CommonEntity {
  @Column()
  portfolioHistoryId: string;
}
