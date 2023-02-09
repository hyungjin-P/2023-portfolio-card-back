import { PortfolioMainVisualTheme } from './portfolio-main-visual-theme.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PortfolioMainVisualThemeEntityDto extends PortfolioMainVisualTheme {
  @ApiProperty({
    description: '작성되는 포트폴리오 메인 비주얼 ID',
    default: 'afe301c5-288c-4323-90b5-87f7cfd10ad6',
  })
  portfolioMainVisualId: string;

  @ApiProperty({
    description: '작성되는 포트폴리오 메인 비주얼 ID',
    default: 'angulate',
  })
  controllerClass: string;

  @ApiProperty({
    description: '작성되는 포트폴리오 메인 비주얼 ID',
    default: 'angulate',
  })
  shareButtonClass: string;

  @ApiProperty({
    description: '타이틀 클래스',
    default: 'angulate',
  })
  titleClass: string;

  @ApiProperty({
    description: '서브타이틀 클래스',
    default: 'angulate',
  })
  subTitleClass: string;

  @ApiProperty({
    description: '태그 타이틀 클래스',
    default: 'angulate',
  })
  tagClass: string;
}
