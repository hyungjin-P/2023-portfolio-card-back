import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { AuthorTempDto } from './dto/author-temp.dto';
import { AuthorJoinDto } from './dto/author-join.dto';
import { AuthorLoginDto } from './dto/author-login.dto';
import { Portfolio } from "../portfolio/portfolio.entity";

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Portfolio)
    private authorProfileRepository: Repository<Portfolio>,
  ) {}

  async getAll(): Promise<Author[]> {
    return await this.authorRepository.find({});
  }

  async createAuthor(): Promise<Author> {
    const newAuthor: Author = new Author();
    newAuthor.provider = 'crackit.com';

    const savedAuthor = await this.authorRepository.save(newAuthor);

    Logger.log(`savedAuthor : ${JSON.stringify(savedAuthor)}`);

    return savedAuthor;
  }

  async joinAuthor(authorJoinDto: AuthorJoinDto): Promise<Author> {
    const joinAuthorCount: number = await this.authorRepository.count({
      where: {
        isTemporaryAuthor: false,
        authorLink: authorJoinDto.authorLink,
      },
    });

    if (joinAuthorCount > 0) {
      throw new HttpException(
        {
          message: '이미 등록된 사용자가 존재합니다.',
        },
        500,
      );
    }

    const tempAuthor: Author = new Author();

    tempAuthor.authorLink = authorJoinDto.authorLink;
    tempAuthor.password = authorJoinDto.password;
    tempAuthor.email = authorJoinDto.email;
    tempAuthor.serviceTerm = authorJoinDto.serviceTerm;
    tempAuthor.isTemporaryAuthor = false;

    return await this.authorRepository.save(tempAuthor);
  }

  async loginAuthor(authorLoginDto: AuthorLoginDto): Promise<Author> {
    const loginAuthors: Author[] = await this.authorRepository.find({
      where: {
        authorLink: authorLoginDto.authorLink,
        password: authorLoginDto.password,
        isTemporaryAuthor: false,
      },
    });

    if (loginAuthors.length === 0) {
      throw new HttpException({ message: '사용자가 없습니다.' }, 500);
    }

    if (loginAuthors.length > 1) {
      throw new HttpException(
        { message: '해당되는 사용자가 너무 많습니다.' },
        500,
      );
    }

    return loginAuthors[0];
  }

  async isDuplicateAuthorLink(authorLink: string): Promise<boolean> {
    const authorCount: number = await this.authorRepository.count({
      where: {
        authorLink,
      },
    });

    return authorCount > 0;
  }

  async isDuplicateEmail(email: string): Promise<boolean> {
    const emailCount: number = await this.authorRepository.count({
      where: {
        email,
      },
    });

    return emailCount > 0;
  }

  async createTempAuthor(authorTempDto: AuthorTempDto): Promise<Author> {
    const newAuthor: Author = new Author();
    newAuthor.provider = authorTempDto.provider;
    newAuthor.authorLink = authorTempDto.authorLink;

    const savedAuthor: Author = await this.authorRepository.save(newAuthor);

    return savedAuthor;
  }

  async modifyAuthor(author: Author): Promise<Author> {
    const savedAuthor = await this.authorRepository.save(author);
    return savedAuthor;
  }

  async deleteAuthor(authorId: string): Promise<void> {
    const deleteAuthor: Author = await this.authorRepository.findOne({
      where: {
        id: authorId,
      },
    });

    if (!deleteAuthor) {
      throw new HttpException({ message: '삭제할 사용자가 없습니다.' }, 200);
    }

    console.log(deleteAuthor);

    await this.authorRepository.remove(deleteAuthor);
  }

  async findAuthorIdByAuthorLink(authorLink: string) {
    return await this.authorRepository.findOne({
      where:{
        authorLink: authorLink,
      },
      relations: {
        portfolios: true,
      },
    });
  }
}
