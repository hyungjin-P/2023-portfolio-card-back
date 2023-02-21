import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  url: string;

  @Column()
  originalName: string;

  @Column()
  encoding: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column()
  bucket: string;

  @Column()
  key: string;

  @Column()
  acl: string;

  @Column()
  location: string;

  @Column()
  etag: string;

  @Column()
  versionId: string;

  @Column({ default: true })
  createdAt: Date;
}
