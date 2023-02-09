import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { PortfolioMainVisual } from '../portfolio-main-visual/portfolio-main-visual.entity';
import { CommonEntity } from '../common/common.entity';

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

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @OneToMany(
    () => PortfolioMainVisual,
    (portfolioMainVisual) => portfolioMainVisual.portfolio,
  )
  portfolioMainVisuals: PortfolioMainVisual[];
}
