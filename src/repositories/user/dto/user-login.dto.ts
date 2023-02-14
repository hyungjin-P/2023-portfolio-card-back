import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    description: '아이디 (사용자 url)',
    example: 'flexible',
  })
  userLink: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'REDACTED_DATABASE_PASSWORD_2',
  })
  password: string;
}
