import { CommonEntity } from '../common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('portfolio_history_exhibition')
export class PortfolioHistoryExhibition extends CommonEntity {
  @Column()
  portfolioHistoryId: string;
}
