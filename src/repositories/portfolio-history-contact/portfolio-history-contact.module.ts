import { Module } from '@nestjs/common';
import { PortfolioHistoryContactService } from './portfolio-history-contact.service';
import { PortfolioHistoryContactController } from './portfolio-history-contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHistoryContact } from './portfolio-history-contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioHistoryContact])],
  providers: [PortfolioHistoryContactService],
  controllers: [PortfolioHistoryContactController],
})
export class PortfolioHistoryContactModule {}
