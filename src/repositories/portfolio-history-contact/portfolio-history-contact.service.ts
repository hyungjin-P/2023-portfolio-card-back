import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PortfolioHistoryContact } from "./portfolio-history-contact.entity";
import { Repository } from "typeorm";

@Injectable()
export class PortfolioHistoryContactService {
  constructor(
    @InjectRepository(PortfolioHistoryContact)
    private portfolioHistoryContactRepository:
      Repository<PortfolioHistoryContact>
  ) {
  }

  async getAll(): Promise<PortfolioHistoryContact[]> {
    return await this.portfolioHistoryContactRepository.find();
  }

  async createPortfolioContact(portfolioHistoryId: string): Promise<PortfolioHistoryContact> {
    let contact: PortfolioHistoryContact = await this.portfolioHistoryContactRepository.findOne({
      where: {
        portfolioHistoryId: portfolioHistoryId,
      }
    });

    if (!contact){
      contact = await this.portfolioHistoryContactRepository.save({portfolioHistoryId});
    }

    return contact;
  }

  async savePortfolioContact(portfolioHistoryContact: PortfolioHistoryContact): Promise<PortfolioHistoryContact> {
    const savedContact = await this.portfolioHistoryContactRepository.save(portfolioHistoryContact);

    if(!savedContact){
      throw new HttpException(
        { message: '포트폴리오 연락처 수정 실패' },
        500,
      );
    }

    return savedContact;
  }
}
