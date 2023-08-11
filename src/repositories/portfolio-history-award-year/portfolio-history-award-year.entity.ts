import { CommonEntity } from '../common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('portfolio_history_award_year')
export class PortfolioHistoryAwardYear extends CommonEntity {
  @Column()
  portfolioHistoryAwardId: string;

  @Column({nullable: true})
  period: string;
}
