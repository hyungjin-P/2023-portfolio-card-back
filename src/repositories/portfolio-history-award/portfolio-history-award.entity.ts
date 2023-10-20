import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { PortfolioHistory } from "../portfolio-history/portfolio-history.entity";

@Entity('portfolio_history_award')
export class PortfolioHistoryAward extends CommonEntity {
  /** 해당 포트폴리오 작품 ID */
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  title: string;

  @OneToMany(()=>PortfolioHistoryAwardSubtitle,
    (entity)=> entity.portfolioHistoryAward)
  subtitles: PortfolioHistoryAwardSubtitle[];

  @ManyToOne(()=>PortfolioHistory, (entity)=> entity.portfolioHistoryAwards)
  portfolioHistory: PortfolioHistory;
}

@Entity('portfolio_history_award_subtitle')
export class PortfolioHistoryAwardSubtitle extends CommonEntity {
  @Column()
  portfolioHistoryAwardId: string;

  @Column({nullable: true})
  subtitle: string;

  @ManyToOne(()=>PortfolioHistoryAward,
    (entity)=>entity.subtitles)
  portfolioHistoryAward: PortfolioHistoryAward

  @OneToMany(()=>PortfolioHistoryAwardSubtitleValue,
    (entity)=>entity.portfolioHistoryAwardSubtitle)
  values: PortfolioHistoryAwardSubtitleValue[];
}

@Entity('portfolio_history_award_subtitle_value')
export class PortfolioHistoryAwardSubtitleValue extends CommonEntity {
  @Column()
  portfolioHistoryAwardSubtitleId: string;

  @Column({nullable: true})
  value: string;

  @ManyToOne(()=>PortfolioHistoryAwardSubtitle,
    (entity)=>entity.values)
  portfolioHistoryAwardSubtitle: PortfolioHistoryAwardSubtitle;
}
