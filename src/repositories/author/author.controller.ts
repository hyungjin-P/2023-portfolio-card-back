import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Author } from './author.entity';
import { AuthorTempDto } from './dto/author-temp.dto';
import { AuthorJoinDto } from './dto/author-join.dto';
import { AuthorLoginDto } from './dto/author-login.dto';

@Controller('author')
@ApiTags('사용자')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get('/getAll')
  @ApiOperation({
    summary: '사용자 정보 전체 조회',
    description: '사용자 정보 전체 조회',
  })
  @ApiCreatedResponse({
    description: `사용자 정보를 전체조회 한다.`,
    type: Author,
  })
  async getAll(): Promise<Author[]> {
    return await this.authorService.getAll();
  }

  @Post('/create')
  @ApiOperation({
    summary: '사용자 추가',
    description: '사용자 추가',
  })
  @ApiCreatedResponse({
    description: `사용자 추가`,
    type: Author,
  })
  async createAuthor(): Promise<Author> {
    return await this.authorService.createAuthor();
  }

  @Post('/joinAuthor')
  @ApiOperation({
    summary: '사용자 회원 가입 완료',
    description: '임시 주소 발급한 회원 대상으로 회원가입을 진행한다.',
  })
  @ApiCreatedResponse({
    description: `사용자 회원 가입 완료`,
    type: AuthorJoinDto,
  })
  async joinAuthor(@Body() authorJoinDto: AuthorJoinDto): Promise<Author> {
    return await this.authorService.joinAuthor(authorJoinDto);
  }

  @Post('/createTempAuthor')
  @ApiOperation({
    summary: '사용자 임시 주소 만들기',
    description: '회원 가입 중 도메인 뒤에 붙는 임시 주소 만들기',
  })
  @ApiCreatedResponse({
    description: `사용자 추가, 임시 데이터`,
    type: Author,
  })
  async createTempAuthor(@Body() authorTempDto: AuthorTempDto): Promise<Author> {
    return await this.authorService.createTempAuthor(authorTempDto);
  }

  @Post('/loginAuthor')
  @ApiOperation({
    summary: '로그인',
    description: '사용자 링크 (authorLink), 비밀번호로 로그인',
  })
  @ApiCreatedResponse({
    description: `결과 => Author` + `\n\n 사용자를 리턴함.`,
    type: Author,
  })
  async loginAuthor(@Body() authorLoginDto: AuthorLoginDto): Promise<Author> {
    return await this.authorService.loginAuthor(authorLoginDto);
  }

  @Get('/isDuplicateAuthorLink')
  @ApiOperation({
    summary: '사용자 url 중복체크',
    description:
      `사용자 url 중복 체크\n\n` +
      `__true__ => _중복_, __false__ => _사용가능_`,
  })
  async isDuplicateAuthorLink(
    @Query('authorLink') authorLink: string,
  ): Promise<boolean> {
    return await this.authorService.isDuplicateAuthorLink(authorLink);
  }

  @Get('/isDuplicateEmail')
  @ApiOperation({
    summary: '이메일 중복체크',
    description:
      `이메일 중복 체크\n\n` + `__true__ => _중복_, __false__ => _사용가능_`,
  })
  async isDuplicateEmail(@Query('email') email: string): Promise<boolean> {
    return await this.authorService.isDuplicateEmail(email);
  }

  @Patch('/modify')
  @ApiOperation({
    summary: '사용자 수정',
    description: '사용자 수정',
  })
  @ApiCreatedResponse({
    description: `사용자 수정, 임시 데이터`,
    type: Author,
  })
  async modifyAuthor(@Body() author: Author): Promise<Author> {
    return await this.authorService.modifyAuthor(author);
  }

  @Delete('/delete')
  @ApiOperation({
    summary: '사용자 삭제',
    description: '사용자 삭제',
  })
  @ApiCreatedResponse({
    description: `사용자 삭제, 임시 데이터`,
  })
  @ApiQuery({ name: 'authorId' })
  async deleteAuthor(@Query('authorId') authorId: string): Promise<void> {
    return await this.authorService.deleteAuthor(authorId);
  }

  @Get('/getAuthorByAuthorLink')
  @ApiOperation({
    summary: '사용자 정보를 링크로 조회',
    description: '사용자 정보를 링크로 조회',
  })
  @ApiCreatedResponse({
    description: `사용자 정보를 링크로 조회한다.`,
    type: Author,
  })
  async findAuthorIdByAuthorLink(@Query('authorLink') authorLink: string): Promise<Author> {
    return await this.authorService.findAuthorIdByAuthorLink(authorLink);
  }
}
