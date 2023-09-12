import { Column, Entity, ManyToOne } from "typeorm";
import { CommonEntity } from '../common/common.entity';
import {
  PortfolioHistoryExhibitionSubtitle
} from "../portfolio-history-exhibition-subtitle/portfolio-history-exhibition-subtitle.entity";

@Entity('portfolio_history_exhibition_subtitle_value')
export class PortfolioHistoryExhibitionSubtitleValue extends CommonEntity {
  @Column()
  portfolioHistoryExhibitionSubtitleId: number;

  @Column({nullable: true})
  value: string;

  @ManyToOne(()=>PortfolioHistoryExhibitionSubtitle,
    (entity)=>entity.values)
  exhibitionSubtitle: PortfolioHistoryExhibitionSubtitle;
}
