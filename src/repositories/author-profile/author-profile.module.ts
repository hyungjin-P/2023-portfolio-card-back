import { Module } from '@nestjs/common';
import { AuthorProfileService } from './author-profile.service';
import { AuthorProfileController } from './author-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorProfile } from './author-profile.entity';
import { Author } from '../author/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorProfile, Author])],
  providers: [AuthorProfileService],
  controllers: [AuthorProfileController],
})
export class AuthorProfileModule {}
