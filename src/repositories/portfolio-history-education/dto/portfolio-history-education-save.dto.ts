import { ApiProperty } from "@nestjs/swagger";

export class PortfolioHistoryEducationSaveDtoList {
  @ApiProperty()
  educationBlockSections: PortfolioHistoryEducationSaveDto[];
}

export class PortfolioHistoryEducationSaveDto{
  @ApiProperty()
  id: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  value: string;
}
