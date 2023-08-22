import { PortfolioArtWorkBlock } from "../portfolio-art-work-block.entity";
import { ApiProperty } from "@nestjs/swagger";

export class PortfolioArtWorkBlockCreateDto extends PortfolioArtWorkBlock{
  @ApiProperty({
    description: 'portfolioArtWorkId',
    default: 'ecaf78a9-efce-4e1b-8aab-931ad027b3f2',
  })
  portfolioArtWorkId: string;

  @ApiProperty({
    description: 'block type, image or text',
    default: 'image',
  })
  blockType: string;

  @ApiProperty({
    description: 'artworks sort',
    default: 0,
  })
  sortNumber: number;

  @ApiProperty({
    description: 'block visibility',
    default: 1
  })
  visibility: boolean;
}
