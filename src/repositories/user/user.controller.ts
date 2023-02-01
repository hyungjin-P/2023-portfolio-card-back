import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';

@Controller('user')
@ApiTags('사용자')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getAll')
  @ApiOperation({
    summary: '사용자 정보 전체 조회',
    description: '사용자 정보 전체 조회',
  })
  @ApiCreatedResponse({
    description: `사용자 정보를 전체조회 한다.`,
    type: User,
  })
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Post('/create')
  @ApiOperation({
    summary: '사용자 추가',
    description: '사용자 추가',
  })
  @ApiCreatedResponse({
    description: `사용자 추가, 임시 데이터`,
    type: User,
  })
  async createUser(): Promise<User> {
    return await this.userService.createUser();
  }

  @Put('/modify')
  @ApiOperation({
    summary: '사용자 수정',
    description: '사용자 수정',
  })
  @ApiCreatedResponse({
    description: `사용자 수정, 임시 데이터`,
    type: User,
  })
  async modifyUser(@Body() user: User): Promise<User> {
    return await this.userService.modifyUser(user);
  }

  @Delete('/delete')
  @ApiOperation({
    summary: '사용자 삭제',
    description: '사용자 삭제',
  })
  @ApiCreatedResponse({
    description: `사용자 삭제, 임시 데이터`,
  })
  @ApiQuery({ name: 'userId' })
  async deleteUser(@Query('userId') userId: string): Promise<void> {
    return await this.userService.deleteUser(userId);
  }
}
