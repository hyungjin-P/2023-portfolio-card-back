import { CommonEntity } from '../common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";


@Entity('portfolio_history_exhibition')
export class PortfolioHistoryExhibition extends CommonEntity {
  @Column()
  portfolioHistoryId: string;

  @Column({nullable: true})
  title: string;

  @OneToMany(()=>PortfolioHistoryExhibitionSubtitle,
    (entity)=>entity.exhibition)
  subtitles: PortfolioHistoryExhibitionSubtitle[];
}

@Entity('portfolio_history_exhibition_subtitle')
export class PortfolioHistoryExhibitionSubtitle extends CommonEntity {
  @Column()
  portfolioHistoryExhibitionId: string;

  @Column({nullable: true})
  subtitle: string;

  @ManyToOne(()=>PortfolioHistoryExhibition,
    (entity)=>entity.subtitles)
  exhibition: PortfolioHistoryExhibition;

  @OneToMany(()=>PortfolioHistoryExhibitionSubtitleValue,
    (entity)=>entity.exhibitionSubtitle)
  values: PortfolioHistoryExhibitionSubtitleValue[];
}

@Entity('portfolio_history_exhibition_subtitle_value')
export class PortfolioHistoryExhibitionSubtitleValue extends CommonEntity {
  @Column()
  portfolioHistoryExhibitionSubtitleId: number;

  @Column({nullable: true})
  value: string;

  @ManyToOne(()=>PortfolioHistoryExhibitionSubtitle,
    (entity)=>entity.values)
  exhibitionSubtitle: PortfolioHistoryExhibitionSubtitle;
}