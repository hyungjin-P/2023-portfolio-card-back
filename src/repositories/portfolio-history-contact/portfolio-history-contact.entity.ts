import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('portfolio_history_contact')
export class PortfolioHistoryContact extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  generalImageUrl: string;

  @Column({nullable: true})
  nickname: string;
}
