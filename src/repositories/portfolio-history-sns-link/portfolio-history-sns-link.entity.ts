import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('portfolio_history_sns_link')
export class PortfolioHistorySnsLink extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  snsUrl: string;
}
