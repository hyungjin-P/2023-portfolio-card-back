import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('portfolio_history_exhibition_year')
export class PortfolioHistoryExhibitionYear extends CommonEntity {
  @Column()
  portfolioHistoryExhibitionId: string;
}
