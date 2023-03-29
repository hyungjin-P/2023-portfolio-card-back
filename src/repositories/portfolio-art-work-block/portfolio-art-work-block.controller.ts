import { Controller } from '@nestjs/common';
import { PortfolioArtWorkBlockService } from './portfolio-art-work-block.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('portfolio-art-work-block')
@ApiTags('포트폴리오 작품 블록')
export class PortfolioArtWorkBlockController {
  constructor(
    private portfolioArtWorkBlockService: PortfolioArtWorkBlockService,
  ) {
  }

}
