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

@Entity('portfolio')
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ description: '사용자 아이디' })
  userId: string;

  @Column()
  @ApiProperty({ description: '포트폴리오 제목' })
  title: string;

  @Column()
  @ApiProperty({ description: '포트폴리오 설명' })
  description: string;

  @Column({ default: true })
  @ApiProperty({ description: '생성일자', required: undefined })
  createdAt: Date;

  @Column({ default: true })
  @ApiProperty({ description: '수정일자', required: undefined })
  updatedAt: Date;

  @Column()
  @ApiProperty({ description: '삭제일자', required: undefined })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @OneToMany(
    () => PortfolioMainVisual,
    (portfolioMainVisual) => portfolioMainVisual.portfolio,
  )
  portfolioMainVisuals: PortfolioMainVisual[];
}
