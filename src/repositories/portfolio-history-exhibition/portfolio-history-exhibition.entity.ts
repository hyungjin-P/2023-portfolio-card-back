import { CommonEntity } from '../common/common.entity';
import { Column, Entity, OneToMany } from "typeorm";
import {
  PortfolioHistoryExhibitionSubtitle
} from "../portfolio-history-exhibition-subtitle/portfolio-history-exhibition-subtitle.entity";

@Entity('portfolio_history_exhibition')
export class PortfolioHistoryExhibition extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  title: string;

  @OneToMany(()=>PortfolioHistoryExhibitionSubtitle,
    (entity)=>entity.exhibition)
  subtitles: PortfolioHistoryExhibitionSubtitle[];
}
