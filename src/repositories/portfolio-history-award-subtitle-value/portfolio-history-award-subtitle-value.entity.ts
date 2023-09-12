import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne } from "typeorm";
import {
  PortfolioHistoryAwardSubtitle
} from "../portfolio-history-award-subtitle/portfolio-history-award-subtitle.entity";

@Entity('portfolio_history_award_subtitle_value')
export class PortfolioHistoryAwardSubtitleValue extends CommonEntity {
  @Column()
  portfolioHistoryAwardSubtitleId: string;

  @Column({nullable: true})
  value: string;

  @ManyToOne(()=>PortfolioHistoryAwardSubtitle,
    (entity)=>entity.values)
  awardSubtitle: PortfolioHistoryAwardSubtitle;
}
