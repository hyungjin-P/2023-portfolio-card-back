import { Controller } from '@nestjs/common';
import { PortfolioArtWorkBlockService } from './portfolio-art-work-block.service';

@Controller('portfolio-art-work-block')
export class PortfolioArtWorkBlockController {

  constructor(
    private portfolioArtWorkBlockService: PortfolioArtWorkBlockService,
  ) {
  }

}
