import { Column, PrimaryGeneratedColumn } from 'typeorm';

/** @description 엔티티 공통 베이스 */
export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true })
  createdAt: Date;

  @Column({ default: true })
  updatedAt: Date;

  @Column()
  deletedAt: Date;
}
