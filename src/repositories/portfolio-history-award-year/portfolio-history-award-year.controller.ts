import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('portfolio-history-award-year')
@ApiTags('작기이력 > 수상내역 > 수상 연도')
export class PortfolioHistoryAwardYearController {
  constructor() {}
}
