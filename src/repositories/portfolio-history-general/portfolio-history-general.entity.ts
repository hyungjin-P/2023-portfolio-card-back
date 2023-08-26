import { Column, Entity, ManyToOne } from "typeorm";
import { CommonEntity } from '../common/common.entity';
import { PortfolioHistory } from "../portfolio-history/portfolio-history.entity";

@Entity('portfolio_history_general')
export class PortfolioHistoryGeneral extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  generalImageUrl: string;

  @Column({nullable: true})
  nickname: string;

  @ManyToOne(() => PortfolioHistory, (entity) => entity.portfolioHistoryGenerals)
  portfolioHistory: PortfolioHistory;
}
