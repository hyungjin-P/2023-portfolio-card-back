import { PortfolioArtWorkPicture } from "../portfolio-art-work-picture.entity";

export class PortfolioArtWorkPictureModifySortDto extends PortfolioArtWorkPicture{
  id: string;

  sortNumber: number;
}
