import { Column, Entity, ManyToOne } from "typeorm";
import { CommonEntity } from '../common/common.entity';
import { PortfolioHistoryEtcSubtitle } from "../portfolio-history-etc-subtitle/portfolio-history-etc-subtitle.entity";

@Entity('portfolio_history_etc_subtitle_value')
export class PortfolioHistoryEtcSubtitleValue extends CommonEntity {
  @Column()
  portfolioHistoryEtcSubtitleId: string;

  @Column({nullable: true})
  value: string;

  @ManyToOne(()=>PortfolioHistoryEtcSubtitle,
    (entity)=>entity.values)
  etcSubtitle: PortfolioHistoryEtcSubtitle;
}
