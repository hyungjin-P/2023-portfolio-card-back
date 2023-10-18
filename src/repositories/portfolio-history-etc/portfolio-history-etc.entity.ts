import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

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

