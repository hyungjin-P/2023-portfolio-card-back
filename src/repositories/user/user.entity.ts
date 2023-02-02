import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from '../user-profile/user-profile.entity';
import { Portfolio } from '../portfolio/portfolio.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column()
  providerId: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: true })
  isLock: boolean;

  @Column({ default: true })
  createdAt: Date;

  @Column({ default: true })
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @OneToMany(() => UserProfile, (userProfile) => userProfile.user)
  userProfiles: UserProfile[];

  @OneToMany(() => UserProfile, (userProfile) => userProfile.user)
  portfolios: Portfolio[];
}
