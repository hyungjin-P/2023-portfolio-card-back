import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PortfolioHistoryGeneral } from "./portfolio-history-general.entity";
import { Repository } from "typeorm";

@Injectable()
export class PortfolioHistoryGeneralService {
  constructor(
    @InjectRepository(PortfolioHistoryGeneral)
    private portfolioHistoryGeneralRepository:
      Repository<PortfolioHistoryGeneral>,
  ) {
  }

  async createPortfolioGeneral(portfolioHistoryId: string) {
    let general: PortfolioHistoryGeneral = await this.portfolioHistoryGeneralRepository.findOne({
        where: {
          portfolioHistoryId: portfolioHistoryId,
        }
      }
    );

    if (!general){
      general = await this.portfolioHistoryGeneralRepository.save({portfolioHistoryId});
    }

    return general;
  }

  async savePortfolioGeneral(portfolioGeneral: PortfolioHistoryGeneral) {
    const savedGeneral = await this.portfolioHistoryGeneralRepository.save(portfolioGeneral)

    if(!savedGeneral){
      throw new HttpException(
        { message: '포트폴리오 기본정보 수정 실패' },
        500,
      );
    }

    return savedGeneral;
  }

  async getAll() {
    return await this.portfolioHistoryGeneralRepository.find();
  }

  async deletePortfolioGeneral(id: string) {
    return await this.portfolioHistoryGeneralRepository.delete(id);
  }
}
