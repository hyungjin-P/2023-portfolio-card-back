import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { PortfolioHistory } from "../portfolio-history/portfolio-history.entity";

@Entity('portfolio_history_etc')
export class PortfolioHistoryEtc extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  title: string;

  @OneToMany(()=>PortfolioHistoryEtcSubtitle,
    (entity)=>entity.portfolioHistoryEtc)
  subtitles: PortfolioHistoryEtcSubtitle[];

  @ManyToOne(()=>PortfolioHistory, (entity)=> entity.portfolioHistoryEtc)
  portfolioHistory: PortfolioHistory;
}

@Entity('portfolio_history_etc_subtitle')
export class PortfolioHistoryEtcSubtitle extends CommonEntity {
  @Column()
  portfolioHistoryEtcId: string;

  @Column({nullable: true})
  subtitle: string;

  @ManyToOne(()=>PortfolioHistoryEtc,
    (entity)=>entity.subtitles)
  portfolioHistoryEtc: PortfolioHistoryEtc;

  @OneToMany(()=>PortfolioHistoryEtcSubtitleValue,
    (entity)=>entity.portfolioHistoryEtcSubtitle)
  values: PortfolioHistoryEtcSubtitleValue[];
}

@Entity('portfolio_history_etc_subtitle_value')
export class PortfolioHistoryEtcSubtitleValue extends CommonEntity {
  @Column()
  portfolioHistoryEtcSubtitleId: string;

  @Column({nullable: true})
  value: string;

  @ManyToOne(()=>PortfolioHistoryEtcSubtitle,
    (entity)=>entity.values)
  portfolioHistoryEtcSubtitle: PortfolioHistoryEtcSubtitle;
}

