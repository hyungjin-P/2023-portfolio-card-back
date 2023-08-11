import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorProfile } from './author-profile.entity';
import { Author } from '../author/author.entity';
import { AuthorProfileCreateDto } from './author-profile.create.dto';

@Injectable()
export class AuthorProfileService {
  constructor(
    @InjectRepository(AuthorProfile)
    private authorProfileRepository: Repository<AuthorProfile>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async createAuthorProfile(
    authorProfile: AuthorProfileCreateDto,
  ): Promise<AuthorProfile> {
    const savedAuthorProfile: AuthorProfile = await this.authorProfileRepository.save(
      authorProfile,
    );

    return savedAuthorProfile;
  }

  async modifyAuthorProfile(authorProfile: AuthorProfile): Promise<AuthorProfile> {
    const findAuthorProfile: AuthorProfile =
      await this.authorProfileRepository.findOne({
        where: {
          id: authorProfile.id,
        },
      });

    if (!findAuthorProfile) {
      throw new HttpException(
        { message: '수정할 사용자 프로필이 없습니다.' },
        500,
      );
    }

    return await this.authorProfileRepository.save(authorProfile);
  }

  async removeAuthorProfile(authorProfileId: string): Promise<void> {
    const authorProfile: AuthorProfile = await this.authorProfileRepository.findOne({
      where: {
        id: authorProfileId,
      },
    });

    await this.authorProfileRepository.remove(authorProfile);
  }

  async findAllAuthorProfileByAuthorId(authorId: string): Promise<AuthorProfile[]> {
    const authorProfileList: AuthorProfile[] =
      await this.authorProfileRepository.find({
        where: {
          authorId,
        },
      });

    if (authorProfileList.length === 0) {
      throw new HttpException(
        { message: '사용자 프로필이 존재하지 않습니다.' },
        HttpStatus.OK,
      );
    }

    return authorProfileList;
  }
}
