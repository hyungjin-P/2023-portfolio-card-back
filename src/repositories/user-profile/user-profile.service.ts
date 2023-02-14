import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { User } from '../user/user.entity';
import { UserProfileCreateDto } from './user-profile.create.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUserProfile(
    userProfile: UserProfileCreateDto,
  ): Promise<UserProfile> {
    const savedUserProfile: UserProfile = await this.userProfileRepository.save(
      userProfile,
    );

    return savedUserProfile;
  }

  async modifyUserProfile(
    userProfile: UserProfile,
  ): Promise<UserProfile> {
    const findUserProfile: UserProfile =
      await this.userProfileRepository.findOne({
        where: {
          id: userProfile.id,
        },
      });

    if (!findUserProfile) {
      throw new HttpException(
        { message: '수정할 사용자 프로필이 없습니다.' },
        200,
      );
    }

    return await this.userProfileRepository.save(userProfile);
  }

  async removeUserProfile(userProfileId: string): Promise<void> {
    const userProfile: UserProfile = await this.userProfileRepository.findOne({
      where: {
        id: userProfileId,
      },
    });

    await this.userProfileRepository.remove(userProfile);
  }

  async findAllUserProfileByUserId(userId: string): Promise<UserProfile[]> {
    const userProfileList: UserProfile[] =
      await this.userProfileRepository.find({
        where: {
          userId,
        },
      });

    if (userProfileList.length === 0) {
      throw new HttpException(
        { message: '사용자 프로필이 존재하지 않습니다.' },
        HttpStatus.OK,
      );
    }

    return userProfileList;
  }
}
