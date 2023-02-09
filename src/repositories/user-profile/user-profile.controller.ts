import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserProfileService } from './user-profile.service';
import { User } from '../user/user.entity';
import { UserProfile } from './user-profile.entity';
import { UserProfileCreateDto } from './user-profile.create.dto';

@Controller('userProfile')
@ApiTags('사용자 프로필')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @Post('/create')
  @ApiOperation({
    summary: '사용자 프로필 추가',
    description: '사용자 추가',
  })
  @ApiCreatedResponse({
    description: `사용자 프로필 추가`,
  })
  async createUserProfile(
    @Body() userProfileCreateDto: UserProfileCreateDto,
  ): Promise<UserProfile> {
    return await this.userProfileService.createUserProfile(
      userProfileCreateDto,
    );
  }

  // async getUserProfile(): Promise<UserProfile | void> {
  //   await this.userProfileService.findAllUserProfileByUserId()
  // }
}
