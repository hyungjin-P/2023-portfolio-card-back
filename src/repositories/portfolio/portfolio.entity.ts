import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { PortfolioMainVisual } from '../portfolio-main-visual/portfolio-main-visual.entity';
import { CommonEntity } from '../common/common.entity';
import { PortfolioArtWork } from '../portfolio-art-work/portfolio-art-work.entity';

@Entity('portfolio')
export class Portfolio extends CommonEntity {
  @Column()
  @ApiProperty({ description: '사용자 아이디' })
  userId: string;

  @Column()
  @ApiProperty({ description: '포트폴리오 제목' })
  title: string;

  @Column()
  @ApiProperty({ description: '포트폴리오 설명' })
  description: string;

  @ManyToOne(() => User, (entity) => entity.portfolios)
  user: User;

  @OneToMany(() => PortfolioMainVisual, (entity) => entity.portfolio)
  portfolioMainVisuals: PortfolioMainVisual[];

  @OneToMany(() => PortfolioArtWork, (entity) => entity.portfolio)
  portfolioArtWorks: PortfolioArtWork[];
}
