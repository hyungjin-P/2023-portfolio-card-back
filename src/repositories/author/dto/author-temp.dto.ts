import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from '../../common/common.entity';

export class AuthorTempDto extends CommonEntity {
  @ApiProperty({
    description: '서비스 제공자 도메인',
    example: 'crackit-universe.com',
  })
  provider: string;

  @ApiProperty({
    description: '사용자가 사용할 링크',
    example: 'flexible',
  })
  authorLink: string;
}
