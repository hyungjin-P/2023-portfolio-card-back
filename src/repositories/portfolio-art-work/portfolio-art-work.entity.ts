import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Portfolio } from '../portfolio/portfolio.entity';

@Entity('portfolio_art_work')
export class PortfolioArtWork extends CommonEntity {
  /** 해당 포트폴리오의 ID */
  @Column()
  portfolioId: string;

  /** 포트폴리오 제목 */
  @Column()
  title: string;

  /** 포트폴리오 설명 */
  @Column()
  description: string;

  /** 포트폴리오 */
  @ManyToOne(() => Portfolio, (entity) => entity.portfolioArtWorks)
  portfolio: Portfolio;

  /** 포트폴리오 작품 */
  @OneToMany(() => PortfolioArtWork, (entity) => entity.portfolio)
  portfolioArtWorks: PortfolioArtWork[];
}
