import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Portfolio } from '../portfolio/portfolio.entity';

@Entity('portfolio_main_visual')
export class PortfolioMainVisual {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  portfolioId: string;

  @Column()
  name: string;

  @Column()
  mainVisualUrl: string;

  @Column()
  nickName: string;

  @Column()
  subTitle: string;

  @Column({ default: true })
  createdAt: Date;

  @Column({ default: true })
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.portfolioMainVisuals)
  portfolio: Portfolio;
}
