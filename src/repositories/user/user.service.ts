import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserProfile } from '../user-profile/user-profile.entity';

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

  async modifyUser(user: User): Promise<User> {
    const savedUser = await this.userRepository.save(user);
    console.log('user ', user);
    return savedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    console.log('userId > ', userId);

    const deleteUser: User = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    console.log(deleteUser);

    await this.userRepository.delete({ id: userId });
  }
}
