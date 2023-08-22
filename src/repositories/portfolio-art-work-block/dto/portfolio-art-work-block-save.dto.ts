import { PortfolioArtWorkBlock } from "../portfolio-art-work-block.entity";
import { ApiProperty } from "@nestjs/swagger";
import { PortfolioArtWorkPicture } from "../../portfolio-art-work-picture/portfolio-art-work-picture.entity";

export class PortfolioArtWorkBlockSaveDto extends PortfolioArtWorkBlock{
  @ApiProperty()
  id: string;

  @ApiProperty()
  sortNumber: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  visibility: boolean;
}
