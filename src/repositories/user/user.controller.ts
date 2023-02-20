import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { UserTempDto } from './dto/user-temp.dto';
import { UserJoinDto } from './dto/user-join.dto';
import { UserLoginDto } from './dto/user-login.dto';

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
    description: `사용자 추가`,
    type: User,
  })
  async createUser(): Promise<User> {
    return await this.userService.createUser();
  }

  @Post('/joinUser')
  @ApiOperation({
    summary: '사용자 회원 가입 완료',
    description: '임시 주소 발급한 회원 대상으로 회원가입을 진행한다.',
  })
  @ApiCreatedResponse({
    description: `사용자 회원 가입 완료`,
    type: UserJoinDto,
  })
  async joinUser(@Body() userJoinDto: UserJoinDto): Promise<User> {
    return await this.userService.joinUser(userJoinDto);
  }

  @Post('/createTempUser')
  @ApiOperation({
    summary: '사용자 임시 주소 만들기',
    description: '회원 가입 중 도메인 뒤에 붙는 임시 주소 만들기',
  })
  @ApiCreatedResponse({
    description: `사용자 추가, 임시 데이터`,
    type: User,
  })
  async createTempUser(@Body() userTempDto: UserTempDto): Promise<User> {
    return await this.userService.createTempUser(userTempDto);
  }

  @Post('/loginUser')
  @ApiOperation({
    summary: '로그인',
    description: '사용자 링크 (userLink), 비밀번호로 로그인',
  })
  @ApiCreatedResponse({
    description: `결과 => User` + `\n\n 사용자를 리턴함.`,
    type: User,
  })
  async loginUser(@Body() userLoginDto: UserLoginDto): Promise<User> {
    return await this.userService.loginUser(userLoginDto);
  }

  @Get('/isDuplicateUserLink')
  @ApiOperation({
    summary: '사용자 url 중복체크',
    description:
      `사용자 url 중복 체크\n\n` +
      `__true__ => _중복_, __false__ => _사용가능_`,
  })
  async isDuplicateUserLink(
    @Query('userLink') userLink: string,
  ): Promise<boolean> {
    return await this.userService.isDuplicateUserLink(userLink);
  }

  @Get('/isDuplicateEmail')
  @ApiOperation({
    summary: '이메일 중복체크',
    description:
      `이메일 중복 체크\n\n` + `__true__ => _중복_, __false__ => _사용가능_`,
  })
  async isDuplicateEmail(@Query('email') email: string): Promise<boolean> {
    return await this.userService.isDuplicateEmail(email);
  }

  @Patch('/modify')
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
