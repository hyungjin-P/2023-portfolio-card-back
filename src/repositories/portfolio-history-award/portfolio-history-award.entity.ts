import { CommonEntity } from '../common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('portfolio_history_award')
export class PortfolioHistoryAward extends CommonEntity {
  /** 해당 포트폴리오 작품 ID */
  @Column()
  portfolioHistoryId: string;
}
