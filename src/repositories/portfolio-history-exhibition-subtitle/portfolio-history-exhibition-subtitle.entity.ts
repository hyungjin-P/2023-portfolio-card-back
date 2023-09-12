import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CommonEntity } from '../common/common.entity';
import { PortfolioHistoryExhibition } from "../portfolio-history-exhibition/portfolio-history-exhibition.entity";
import {
  PortfolioHistoryExhibitionSubtitleValue
} from "../portfolio-history-exhibition-subtitle-value/portfolio-history-exhibition-subtitle-value.entity";

@Entity('portfolio_history_exhibition_subtitle')
export class PortfolioHistoryExhibitionSubtitle extends CommonEntity {
  @Column()
  portfolioHistoryExhibitionId: string;

  @Column({nullable: true})
  subtitle: string;

  @ManyToOne(()=>PortfolioHistoryExhibition,
    (entity)=>entity.subtitles)
  exhibition: PortfolioHistoryExhibition;

  @OneToMany(()=>PortfolioHistoryExhibitionSubtitleValue,
    (entity)=>entity.exhibitionSubtitle)
  values: PortfolioHistoryExhibitionSubtitleValue[];
}
