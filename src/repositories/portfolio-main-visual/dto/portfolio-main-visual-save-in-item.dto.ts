import { ApiProperty } from '@nestjs/swagger';
import { PortfolioMainVisualTag } from '../../portfolio-main-visual-tag/portfolio-main-visual-tag.entity';

export class PortfolioMainVisualSaveInItemDto {
  @ApiProperty({
    description: '포트폴리오 메인 visual ID',
  })
  mainVisualId: string;

  @ApiProperty({
    description: '작성되는 포트폴리오의 id',
    default: '6ae6d61e-4462-4412-9ecd-394b24575795',
  })
  portfolioId: string;

  @ApiProperty({
    description:
      '해당 메인 비주얼의 이름 \n\n' +
      '(향후 여러개의 메인 비주얼을 작성해두고 교체할 수 있도록 할 것임)',
    default: 'PORTFOLIO',
  })
  name: string;

  @ApiProperty({
    description: '메인 비주얼 이미지 url',
    default: 'https://REDACTED_EXAMPLE_IMAGE_URL',
  })
  mainVisualUrl: string;

  @ApiProperty({
    description: '포트폴리오에 표시되는 닉네임(제목)',
    default: '포트폴리오 닉네임',
  })
  nickName: string;

  @ApiProperty({
    default: '제목 하단에 표시되는 서브 타이틀',
  })
  subTitle: string;

  @ApiProperty({
    description: '포트폴리오의 태그',
    default:
      `[ portfolioMainVisualId: 'afe301c5-288c-4323-90b5-87f7cfd10ad6', ` +
      `content: 'tag']`,
  })
  portfolioMainVisualTags: PortfolioMainVisualTag[];
}
