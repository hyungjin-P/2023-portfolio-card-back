import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Portfolio } from '../portfolio/portfolio.entity';
import { PortfolioArtWorkBlock } from '../portfolio-art-work-block/portfolio-art-work-block.entity';

@Entity('portfolio_art_work')
export class PortfolioArtWork extends CommonEntity {
  /** 해당 포트폴리오의 ID */
  @Column()
  portfolioId: string;

  /** 포트폴리오 제목 */
  @Column({nullable: true})
  title: string;

  /** 포트폴리오 설명 */
  @Column({nullable: true})
  description: string;

  /** 포트폴리오 */
  @ManyToOne(() => Portfolio, (entity) => entity.portfolioArtWorks)
  portfolio: Portfolio;

  /** 포트폴리오 작품 */
  @OneToMany(() => PortfolioArtWorkBlock, (entity) => entity.portfolioArtWork)
  portfolioArtWorkBlocks: PortfolioArtWorkBlock[];
}
