import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { PortfolioHistoryEtc } from "../portfolio-history-etc/portfolio-history-etc.entity";
import {
  PortfolioHistoryEtcSubtitleValue
} from "../portfolio-history-etc-subtitle-value/portfolio-history-etc-subtitle-value.entity";

@Entity('portfolio_history_etc_subtitle')
export class PortfolioHistoryEtcSubtitle extends CommonEntity {
  @Column()
  portfolioHistoryEtcId: string;

  @Column({nullable: true})
  subtitle: string;

  @ManyToOne(()=>PortfolioHistoryEtc,
    (entity)=>entity.subtitles)
  etc: PortfolioHistoryEtc;

  @OneToMany(()=>PortfolioHistoryEtcSubtitleValue,
    (entity)=>entity.etcSubtitle)
  values: PortfolioHistoryEtcSubtitleValue[];
}
