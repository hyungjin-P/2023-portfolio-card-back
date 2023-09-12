import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { PortfolioHistoryAward } from "../portfolio-history-award/portfolio-history-award.entity";
import {
  PortfolioHistoryAwardSubtitleValue
} from "../portfolio-history-award-subtitle-value/portfolio-history-award-subtitle-value.entity";

@Entity('portfolio_history_award_subtitle')
export class PortfolioHistoryAwardSubtitle extends CommonEntity {
  @Column()
  portfolioHistoryAwardId: string;

  @Column({nullable: true})
  subtitle: string;

  @ManyToOne(()=>PortfolioHistoryAward,
    (entity)=>entity.subtitles)
  award: PortfolioHistoryAward

  @OneToMany(()=>PortfolioHistoryAwardSubtitleValue,
    (entity)=>entity.awardSubtitle)
  values: PortfolioHistoryAwardSubtitleValue[];
}
