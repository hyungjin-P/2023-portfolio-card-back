import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { AuthorController } from './author.controller';
import { Portfolio } from "../portfolio/portfolio.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Author, Portfolio])],
  providers: [AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
