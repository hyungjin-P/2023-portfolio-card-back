import { CommonEntity } from '../common/common.entity';
import { Column, Entity, OneToMany } from "typeorm";
import {
  PortfolioHistoryAwardSubtitle
} from "../portfolio-history-award-subtitle/portfolio-history-award-subtitle.entity";

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
