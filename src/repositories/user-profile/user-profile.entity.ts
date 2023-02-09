import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { CommonEntity } from '../common/common.entity';

@Entity('user_profile')
export class UserProfile extends CommonEntity {
  @Column()
  userId: string;

  @Column()
  profileImageUrl: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @ManyToOne(() => User, (user) => user.userProfiles)
  user: User;
}
