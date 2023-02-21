import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileEntity } from './file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
