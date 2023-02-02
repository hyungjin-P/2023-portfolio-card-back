import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity('user_profile')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID' })
  id: string;

  @Column()
  @ApiProperty({ description: '사용자 ID (DB key)' })
  userId: string;

  @Column()
  @ApiProperty({ description: '프로필 사진 이미지 주소' })
  profileImageUrl: string;

  @Column()
  @ApiProperty({ description: '휴대전화 번호' })
  phoneNumber: string;

  @Column()
  @ApiProperty({ description: '가입 이메일' })
  email: string;

  @Column({ default: true })
  @ApiProperty({ description: '생성일자' })
  createdAt: Date;

  @Column({ default: true })
  @ApiProperty({ description: '수정일자' })
  updatedAt: Date;

  @Column()
  @ApiProperty({ description: '삭제일자' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.userProfiles)
  user: User;
}
