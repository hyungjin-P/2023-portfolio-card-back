import { PortfolioMainVisual } from './portfolio-main-visual.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PortfolioMainVisualEntityDto extends PortfolioMainVisual {
  id: string = super.id;

  @ApiProperty({
    description: '작성되는 포트폴리오의 id',
    default: '6ae6d61e-4462-4412-9ecd-394b24575795',
  })
  portfolioId: string = super.portfolioId;

  @ApiProperty({
    description: '표시되는 닉네임',
    default: 'PORTFOLIO',
  })
  name: string = super.name;

  @ApiProperty({
    default: 'http://naver.com',
  })
  mainVisualUrl: string = super.mainVisualUrl;

  @ApiProperty({
    default: 'asdasdasd',
  })
  nickName: string = super.nickName;

  @ApiProperty({
    default: 'asdasdljklajsd',
  })
  subTitle: string = super.subTitle;

  createdAt: Date = super.createdAt;

  updatedAt: Date = super.updatedAt;

  deletedAt: Date = super.deletedAt;
}
