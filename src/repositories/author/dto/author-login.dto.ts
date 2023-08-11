import { ApiProperty } from '@nestjs/swagger';

export class AuthorLoginDto {
  @ApiProperty({
    description: '아이디 (사용자 url)',
    example: 'flexible',
  })
  authorLink: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'REDACTED_DATABASE_PASSWORD_2',
  })
  password: string;
}
