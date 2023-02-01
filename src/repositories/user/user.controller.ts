import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';

@Controller('user')
@ApiTags('사용자 프로필')
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
}
