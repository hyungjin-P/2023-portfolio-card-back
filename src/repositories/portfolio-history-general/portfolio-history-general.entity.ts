import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('portfolio_history_general')
export class PortfolioHistoryGeneral extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column()
  profileImageUrl: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
