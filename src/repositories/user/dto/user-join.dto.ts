import { ApiProperty } from '@nestjs/swagger';

export class UserJoinDto {
  @ApiProperty({
    description: '서비스 제공자 도메인',
    example: 'crackit-universe.com',
  })
  id: string;

  @ApiProperty({
    description: '서비스 제공자 도메인',
    example: 'crackit-universe.com',
  })
  userLink: string;

  @ApiProperty({
    description: '서비스 제공자 도메인',
    example: 'flexible',
  })
  password: string;

  @ApiProperty({
    description: '사용자 이메일 (비밀번호 찾기 용도)',
    example: 'sample-user@example.com',
  })
  email: string;

  @ApiProperty({
    description: '서비스 이용약관 동의 여부',
    example: true,
  })
  serviceTerm: boolean;
}
