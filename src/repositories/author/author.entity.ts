import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { AuthorProfile } from '../author-profile/author-profile.entity';
import { Portfolio } from '../portfolio/portfolio.entity';

@Entity('author')
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  provider: string;

  @Column({nullable: true})
  providerId: string;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  password: string;

  @Column({nullable: true})
  email: string;

  @Column({ default: true })
  isLock: boolean;

  @Column({ default: true })
  isTemporaryAuthor: boolean;

  @Column({nullable: true})
  authorLink: string;

  @Column({ default: ()=>'CURRENT_TIMESTAMP(0)', type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ default: ()=>'CURRENT_TIMESTAMP(0)', type: 'timestamp without time zone' })
  updatedAt: Date;

  @Column({nullable: true})
  deletedAt: Date;

  @Column({ default: true })
  serviceTerm: boolean;

  @OneToMany(() => AuthorProfile, (authorProfile) => authorProfile.author)
  authorProfiles: AuthorProfile[];

  @OneToMany(() => AuthorProfile, (authorProfile) => authorProfile.author)
  portfolios: Portfolio[];
}
