import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  authorId: string;

  @Column()
  url: string;

  @Column({nullable: true})
  originalName: string;

  @Column({nullable: true})
  encoding: string;

  @Column({nullable: true})
  mimetype: string;

  @Column({nullable: true})
  size: number;

  @Column()
  bucket: string;

  @Column()
  key: string;

  @Column({nullable: true})
  acl: string;

  @Column({nullable: true})
  location: string;

  @Column({nullable: true})
  etag: string;

  @Column({nullable: true})
  versionId: string;

  @Column({ default: ()=>'CURRENT_TIMESTAMP(0)', type: 'timestamp without time zone'  })
  createdAt: Date;
}
