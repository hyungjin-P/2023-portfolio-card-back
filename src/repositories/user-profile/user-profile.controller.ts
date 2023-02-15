import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserProfileService } from './user-profile.service';
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

  @Patch('/modify')
  @ApiOperation({
    summary: '사용자 프로필 수정',
    description:
      `사용자 프로필 객체를 수정 \n\n` +
      `__Type__ => UserProfile \n\n` +
      `__return__ => UserProfile \n\n`,
  })
  async modifyUserProfile(
    @Body() userProfile: UserProfile,
  ): Promise<UserProfile> {
    return await this.userProfileService.modifyUserProfile(userProfile);
  }

  @Delete('/remove')
  @ApiOperation({
    summary: '사용자 프로필 삭제',
    description: `사용자의 프로필을 삭제한다`,
  })
  async removeUserProfile(
    @Query('userProfileId') userProfileId: string,
  ): Promise<void> {
    await this.userProfileService.removeUserProfile(userProfileId);
  }

  @Get('/findAllUserProfileByUserId')
  @ApiOperation({
    summary: '사용자 프로필 전체 조회',
    description: `사용자 프로필 전체 조회`,
  })
  async findAllUserProfileByUserId(
    @Query('userId') userId: string,
  ): Promise<UserProfile[]> {
    return await this.userProfileService.findAllUserProfileByUserId(userId);
  }
}
