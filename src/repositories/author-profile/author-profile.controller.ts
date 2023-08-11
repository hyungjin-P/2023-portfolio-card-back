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
import { AuthorProfileService } from './author-profile.service';
import { AuthorProfile } from './author-profile.entity';
import { AuthorProfileCreateDto } from './author-profile.create.dto';

@Controller('authorProfile')
@ApiTags('사용자 프로필')
export class AuthorProfileController {
  constructor(private authorProfileService: AuthorProfileService) {}

  @Post('/create')
  @ApiOperation({
    summary: '사용자 프로필 추가',
    description: '사용자 추가',
  })
  @ApiCreatedResponse({
    description: `사용자 프로필 추가`,
  })
  async createAuthorProfile(
    @Body() authorProfileCreateDto: AuthorProfileCreateDto,
  ): Promise<AuthorProfile> {
    return await this.authorProfileService.createAuthorProfile(
      authorProfileCreateDto,
    );
  }

  @Patch('/modify')
  @ApiOperation({
    summary: '사용자 프로필 수정',
    description:
      `사용자 프로필 객체를 수정 \n\n` +
      `__Type__ => AuthorProfile \n\n` +
      `__return__ => AuthorProfile \n\n`,
  })
  async modifyAuthorProfile(
    @Body() authorProfile: AuthorProfile,
  ): Promise<AuthorProfile> {
    return await this.authorProfileService.modifyAuthorProfile(authorProfile);
  }

  @Delete('/remove')
  @ApiOperation({
    summary: '사용자 프로필 삭제',
    description: `사용자의 프로필을 삭제한다`,
  })
  async removeAuthorProfile(
    @Query('authorProfileId') authorProfileId: string,
  ): Promise<void> {
    await this.authorProfileService.removeAuthorProfile(authorProfileId);
  }

  @Get('/findAllAuthorProfileByAuthorId')
  @ApiOperation({
    summary: '사용자 프로필 전체 조회',
    description: `사용자 프로필 전체 조회`,
  })
  async findAllAuthorProfileByAuthorId(
    @Query('authorId') authorId: string,
  ): Promise<AuthorProfile[]> {
    return await this.authorProfileService.findAllAuthorProfileByAuthorId(authorId);
  }
}
