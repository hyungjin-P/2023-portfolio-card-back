import { ApiProperty } from '@nestjs/swagger';

export class PortfolioCreateNewPortfolioDto {
  @ApiProperty({
    description: '사용자 row id',
    example: '059d702b-73bf-479c-b3ed-8723ee7580b9',
  })
  userId: string;
}
