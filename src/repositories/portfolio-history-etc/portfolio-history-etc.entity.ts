import { CommonEntity } from '../common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('portfolio_history_etc')
export class PortfolioHistoryEtc extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column()
  contentTitle: string;
}
