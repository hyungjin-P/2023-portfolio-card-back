import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Portfolio } from '../portfolio/portfolio.entity';

@Entity('portfolio_history')
export class PortfolioHistory extends CommonEntity {
  @Column()
  portfolioId: string;

  /** 포트폴리오 작가 이력 제목 */
  @Column({nullable: true})
  title: string;

  /** 포트폴리오 작가 이력 설명 */
  @Column({nullable: true})
  description: string;

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
  @ManyToOne(() => Portfolio, (entity) => entity.portfolioArtWorks)
  portfolio: Portfolio;

  /** 포트폴리오 작품 */
  // @OneToMany(() => PortfolioArtWork, (entity) => entity.portfolio)
  // portfolioArtWorks: PortfolioArtWork[];
}
