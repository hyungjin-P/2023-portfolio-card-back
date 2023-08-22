import { PortfolioArtWorkPicture } from "../portfolio-art-work-picture.entity";
import { ApiProperty } from "@nestjs/swagger";

export class PortfolioArtWorkPictureSaveDto extends PortfolioArtWorkPicture{
  @ApiProperty({
    description: '포트폴리오 작품 블럭 아이디',
    default: '4862d218-708a-457c-be1b-b666f7ad6a7f'
  })
  portfolioArtWorkBlockId: string;

  @ApiProperty({
    description: '포트폴리오 작품 이미지 URL',
    default: 'https://REDACTED_S3_BUCKET.s3.ap-northeast-2.amazonaws.com/REDACTED_S3_PATH_2/a8ceb96d-97f0-425d-bf7c-5392282f354d'
  })
  url: string;

  @ApiProperty({
    description: '포트폴리오 작품 이미지 정렬 기준',
    default: 0
  })
  sortNumber: number;
}
