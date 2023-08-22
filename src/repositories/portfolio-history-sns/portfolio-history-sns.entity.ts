import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('portfolio_history_sns')
export class PortfolioHistorySns extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  linkUrl: string;

  @Column({nullable: true})
  description: string;
}
