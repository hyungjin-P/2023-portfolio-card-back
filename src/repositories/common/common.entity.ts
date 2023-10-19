import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/** @description 엔티티 공통 베이스 */
export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ default: ()=>'CURRENT_TIMESTAMP(0)', type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ default: ()=>'CURRENT_TIMESTAMP(0)', type: 'timestamp without time zone'  })
  updatedAt: Date;

  @DeleteDateColumn({nullable: true})
  deletedAt: Date;
}
