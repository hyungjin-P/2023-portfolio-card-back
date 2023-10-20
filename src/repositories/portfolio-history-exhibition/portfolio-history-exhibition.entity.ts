import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { PortfolioHistory } from "../portfolio-history/portfolio-history.entity";


@Entity('portfolio_history_exhibition')
export class PortfolioHistoryExhibition extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  title: string;

  @OneToMany(()=>PortfolioHistoryExhibitionSubtitle,
    (entity)=>entity.portfolioHistoryExhibition)
  subtitles: PortfolioHistoryExhibitionSubtitle[];

  @ManyToOne(()=>PortfolioHistory, (entity)=> entity.portfolioHistoryExhibitions)
  portfolioHistory: PortfolioHistory;
}

@Entity('portfolio_history_exhibition_subtitle')
export class PortfolioHistoryExhibitionSubtitle extends CommonEntity {
  @Column()
  portfolioHistoryExhibitionId: string;

  @Column({nullable: true})
  subtitle: string;

  @ManyToOne(()=>PortfolioHistoryExhibition,
    (entity)=>entity.subtitles)
  portfolioHistoryExhibition: PortfolioHistoryExhibition;

  @OneToMany(()=>PortfolioHistoryExhibitionSubtitleValue,
    (entity)=>entity.portfolioHistoryExhibitionSubtitle)
  values: PortfolioHistoryExhibitionSubtitleValue[];
}

@Entity('portfolio_history_exhibition_subtitle_value')
export class PortfolioHistoryExhibitionSubtitleValue extends CommonEntity {
  @Column()
  portfolioHistoryExhibitionSubtitleId: string;

  @Column({nullable: true})
  value: string;

  @ManyToOne(()=>PortfolioHistoryExhibitionSubtitle,
    (entity)=>entity.values)
  portfolioHistoryExhibitionSubtitle: PortfolioHistoryExhibitionSubtitle;
}
