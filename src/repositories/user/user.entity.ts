import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID' })
  id: string;

  @Column()
  @ApiProperty({ description: '서비스 제공자' })
  provider: string;

  @Column()
  @ApiProperty({ description: '서비스 제공자 ID' })
  providerId: string;

  @Column()
  @ApiProperty({ description: '사용자 명' })
  name: string;

  @Column()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @Column()
  @ApiProperty({ description: '이메일' })
  email: string;

  @Column({ default: true })
  @ApiProperty({ description: '잠금여부' })
  isLock: boolean;

  @Column({ default: true })
  @ApiProperty({ description: '생성일자' })
  createdAt: Date;

  @Column({ default: true })
  @ApiProperty({ description: '수정일자' })
  updatedAt: Date;

  @Column()
  @ApiProperty({ description: '삭제일자' })
  deletedAt: Date;
}
