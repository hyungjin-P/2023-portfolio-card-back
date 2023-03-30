import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('portfolio_history_etc_item')
export class PortfolioHistoryEtcItem extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column()
  period: string;

  @Column()
  content: string;
}
