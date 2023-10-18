import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity('portfolio_history_award')
export class PortfolioHistoryAward extends CommonEntity {
  /** 해당 포트폴리오 작품 ID */
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  title: string;

  @OneToMany(()=>PortfolioHistoryAwardSubtitle,
    (entity)=> entity.award)
  subtitles: PortfolioHistoryAwardSubtitle[];
}

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
