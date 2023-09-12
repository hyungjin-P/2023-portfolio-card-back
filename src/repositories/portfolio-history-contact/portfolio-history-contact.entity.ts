import { Column, Entity, ManyToOne } from "typeorm";
import { CommonEntity } from '../common/common.entity';
import { PortfolioHistory } from "../portfolio-history/portfolio-history.entity";

@Entity('portfolio_history_contact')
export class PortfolioHistoryContact extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({default: '+82'})
  prefix: string;

  @Column({nullable: true})
  tel: string;

  @Column({nullable: true})
  email: string;

  @ManyToOne(() => PortfolioHistory, (entity) => entity.portfolioHistoryContacts)
  portfolioHistory: PortfolioHistory;
}
