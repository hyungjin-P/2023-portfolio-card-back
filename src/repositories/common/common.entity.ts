import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

/** @description 엔티티 공통 베이스 */
export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: ()=>'CURRENT_TIMESTAMP(0)', type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ default: ()=>'CURRENT_TIMESTAMP(0)', type: 'timestamp without time zone'  })
  updatedAt: Date;

  @Column({nullable: true})
  deletedAt: Date;
}
