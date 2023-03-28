import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Portfolio } from '../portfolio/portfolio.entity';

@Entity('portfolio_history')
export class PortfolioHistory extends CommonEntity {
  @Column()
  portfolioId: string;

  /** 포트폴리오 작가 이력 제목 */
  @Column()
  title: string;

  /** 포트폴리오 작가 이력 설명 */
  @Column()
  description: string;

  /** 포트폴리오 */
  @ManyToOne(() => Portfolio, (entity) => entity.portfolioArtWorks)
  portfolio: Portfolio;

  /** 포트폴리오 작품 */
  // @OneToMany(() => PortfolioArtWork, (entity) => entity.portfolio)
  // portfolioArtWorks: PortfolioArtWork[];
}
