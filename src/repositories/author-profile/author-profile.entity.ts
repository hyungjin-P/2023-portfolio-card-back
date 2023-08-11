import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../author/author.entity';
import { CommonEntity } from '../common/common.entity';

@Entity('author_profile')
export class AuthorProfile extends CommonEntity {
  @Column()
  authorId: string;

  @Column({nullable: true})
  profileImageUrl: string;

  @Column({nullable: true})
  phoneNumber: string;

  @Column({nullable: true})
  email: string;

  @ManyToOne(() => Author, (author) => author.authorProfiles)
  author: Author;
}
