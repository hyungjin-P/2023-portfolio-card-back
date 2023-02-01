import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, User])],
  providers: [UserProfileService],
  controllers: [UserProfileController],
})
export class UserProfileModule {}
