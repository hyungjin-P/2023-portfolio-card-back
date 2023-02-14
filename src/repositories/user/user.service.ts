import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserProfile } from '../user-profile/user-profile.entity';
import { UserTempDto } from './dto/user-temp.dto';
import { UserJoinDto } from './dto/user-join.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        userProfiles: true,
      },
    });
  }

  async createUser(): Promise<User> {
    const newUser: User = new User();
    newUser.provider = 'crackit.com';

    const savedUser = await this.userRepository.save(newUser);

    Logger.log(`savedUser : ${JSON.stringify(savedUser)}`);

    return savedUser;
  }

  async joinUser(userJoinDto: UserJoinDto): Promise<User> {
    const joinUserCount: number = await this.userRepository.count({
      where: {
        isTemporaryUser: false,
        userLink: userJoinDto.userLink,
      },
    });

    if (joinUserCount > 0) {
      throw new HttpException(
        {
          message: '이미 등록된 사용자가 존재합니다.',
        },
        200,
      );
    }

    const tempUser: User = await this.userRepository.findOne({
      where: { id: userJoinDto.id },
    });

    if (!tempUser) {
      throw new HttpException(
        {
          message: '회원가입을 진행중인 사용자가 없습니다.',
        },
        200,
      );
    }

    tempUser.userLink = userJoinDto.userLink;
    tempUser.password = userJoinDto.password;
    tempUser.email = userJoinDto.email;
    tempUser.serviceTerm = userJoinDto.serviceTerm;
    tempUser.isTemporaryUser = false;

    return await this.userRepository.save(tempUser);
  }

  async loginUser(userLoginDto: UserLoginDto): Promise<User> {
    const loginUsers: User[] = await this.userRepository.find({
      where: {
        userLink: userLoginDto.userLink,
        password: userLoginDto.password,
      },
    });

    if (loginUsers.length === 0) {
      throw new HttpException({ message: '사용자가 없습니다.' }, 200);
    }

    if (loginUsers.length > 1) {
      throw new HttpException(
        { message: '해당되는 사용자가 너무 많습니다.' },
        200,
      );
    }

    return loginUsers[0];
  }

  async isDuplicateUserLink(userLink: string): Promise<boolean> {
    const userCount: number = await this.userRepository.count({
      where: {
        userLink,
      },
    });

    return userCount > 0;
  }

  async createTempUser(userTempDto: UserTempDto): Promise<User> {
    const newUser: User = new User();
    newUser.provider = userTempDto.provider;
    newUser.userLink = userTempDto.userLink;

    const savedUser: User = await this.userRepository.save(newUser);

    return savedUser;
  }

  async modifyUser(user: User): Promise<User> {
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const deleteUser: User = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!deleteUser) {
      throw new HttpException({ message: '삭제할 사용자가 없습니다.' }, 200);
    }

    console.log(deleteUser);

    await this.userRepository.remove(deleteUser);
  }
}
