import { Module } from '@nestjs/common';
import { PortfolioHistoryGeneralService } from './portfolio-history-general.service';
import { PortfolioHistoryGeneralController } from './portfolio-history-general.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryGeneral } from './portfolio-history-general.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryGeneral])],
  providers: [PortfolioHistoryGeneralService],
  controllers: [PortfolioHistoryGeneralController],
})
export class PortfolioHistoryGeneralModule {}
