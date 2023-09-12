import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne } from "typeorm";
import { PortfolioHistoryEtcSubtitle } from "../portfolio-history-etc-subtitle/portfolio-history-etc-subtitle.entity";

@Entity('portfolio_history_etc')
export class PortfolioHistoryEtc extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  title: string;

  @ManyToOne(()=>PortfolioHistoryEtcSubtitle,
    (entity)=>entity.etc)
  subtitles: PortfolioHistoryEtcSubtitle[];
}
