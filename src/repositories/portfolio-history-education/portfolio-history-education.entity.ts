import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CommonEntity } from '../common/common.entity';

@Entity('portfolio_history_education')
export class PortfolioHistoryEducation extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  title: string;

  @OneToMany(()=>PortfolioHistoryEducationSubtitle,(entity)=>entity.education)
  subtitles: PortfolioHistoryEducationSubtitle[];
}

@Entity('portfolio_history_education_subtitle')
export class PortfolioHistoryEducationSubtitle extends CommonEntity {

  @Column()
  portfolioHistoryEducationId: string;

  @Column({nullable: true})
  subtitle: string;

  @ManyToOne(()=>PortfolioHistoryEducation, (entity)=>entity.subtitles)
  education: PortfolioHistoryEducation;

  @OneToMany(()=>PortfolioHistoryEducationSubtitleValue,
    (entity)=>entity.educationSubtitle)
  values: PortfolioHistoryEducationSubtitleValue[];
}

@Entity('portfolio_history_education_subtitle_value')
export class PortfolioHistoryEducationSubtitleValue extends CommonEntity {
  @Column()
  portfolioHistoryEducationSubtitleId: string;

  @Column({nullable: true})
  value: string;

  @ManyToOne(()=>PortfolioHistoryEducationSubtitle,
    (entity)=>entity.values)
  educationSubtitle: PortfolioHistoryEducationSubtitle;
}
