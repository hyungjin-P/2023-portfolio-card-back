import { PortfolioMainVisual } from '../portfolio-main-visual.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PortfolioMainVisualEntityDto extends PortfolioMainVisual {
  @ApiProperty({
    description: '작성되는 포트폴리오의 id',
    default: '6ae6d61e-4462-4412-9ecd-394b24575795',
  })
  portfolioId: string;

  @ApiProperty({
    description: '표시되는 닉네임',
    default: 'PORTFOLIO',
  })
  name: string;

  @ApiProperty({
    description: '메인 비주얼 이미지 url',
    default: 'https://REDACTED_EXAMPLE_IMAGE_URL',
  })
  mainVisualUrl: string;

  @ApiProperty({
    default: 'NICKNAME',
  })
  nickName: string;

  @ApiProperty({
    default: 'sub title sub title',
  })
  subTitle: string;
}
