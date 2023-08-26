import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Portfolio } from '../portfolio/portfolio.entity';
import { PortfolioHistoryGeneral } from "../portfolio-history-general/portfolio-history-general.entity";

@Entity('portfolio_history')
export class PortfolioHistory extends CommonEntity {
  @Column()
  portfolioId: string;

  /** 포트폴리오 작가 프로필 블럭 공개 여부  */
  @Column({default: true})
  generalIsPublic: boolean;
  @Column({default: true})
  contactIsPublic: boolean;
  @Column({default: true})
  educationIsPublic: boolean;
  @Column({default: true})
  exhibitionIsPublic: boolean;
  @Column({default: true})
  awardIsPublic: boolean;
  @Column({default: true})
  etcIsPublic: boolean;
  @Column({default: true})
  snsIsPublic: boolean;

  /** 포트폴리오 */
  @ManyToOne(() => Portfolio, (entity) => entity.portfolioHistories)
  portfolio: Portfolio;

  @OneToMany(() => PortfolioHistoryGeneral, (entity)=> entity.portfolioHistory)
  portfolioHistoryGenerals: PortfolioHistoryGeneral[];
}
