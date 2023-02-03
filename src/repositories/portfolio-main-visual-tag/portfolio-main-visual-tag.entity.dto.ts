import { PortfolioMainVisualTag } from './portfolio-main-visual-tag.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PortfolioMainVisualTagEntityDto extends PortfolioMainVisualTag {
  @ApiProperty({
    description: '작성되는 포트폴리오 메인 비주얼 ID',
    default: 'afe301c5-288c-4323-90b5-87f7cfd10ad6',
  })
  portfolioMainVisualId: string;

  @ApiProperty({
    description: '태그 내용',
    default: 'TAG',
  })
  content: string;
}
