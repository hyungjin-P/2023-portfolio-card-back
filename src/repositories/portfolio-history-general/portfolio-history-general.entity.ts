import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('portfolio_history_general')
export class PortfolioHistoryGeneral extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  profileImageUrl: string;

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  description: string;
}
