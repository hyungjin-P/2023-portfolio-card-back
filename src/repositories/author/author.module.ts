import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { AuthorController } from './author.controller';
import { AuthorProfile } from '../author-profile/author-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, AuthorProfile])],
  providers: [AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
