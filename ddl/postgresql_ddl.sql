--#############################################
--###################  DDL  ###################
--#############################################

--## 사용자
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table author
(
    id          varchar(50)                          primary key,
    provider    varchar(255)                         null,
    provider_id varchar(255)                         null,
    name        varchar(50)                          null,
    password    varchar(50)                          null,
    email       varchar(100)                         null,
    created_at  timestamp   default CURRENT_TIMESTAMP null,
    updated_at  timestamp   default CURRENT_TIMESTAMP null,
    deleted_at  timestamp                             null,
    is_lock     smallint default 0                 null
);


--## 작가 포트폴리오
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio
(
    id          varchar(50)                        primary key,
    author_id     varchar(50)                        not null ,
    title       varchar(50) ,
    description varchar(255) ,
    created_at  timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at  timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at  timestamp(0)                           null ,
    constraint FK_portfolio_art_work_author foreign key (author_id) references author (id)
);


--## 작가 포트폴리오 > 메인 비주얼
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_main_visual
(
    id              varchar(50)                        primary key,
    portfolio_id    varchar(50)                        not null ,
    main_visual_url varchar(50)                        not null ,
    name            varchar(50) ,
    nick_name       varchar(50) ,
    sub_title       varchar(50) ,
    created_at      timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at      timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at      timestamp(0)                           null ,
    constraint FK_portfolio_id foreign key (portfolio_id) references portfolio (id)
);


--## 메인 비주얼 테마
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_main_visual_theme
(
    id                       varchar(50)                        primary key,
    portfolio_main_visual_id varchar(50)                        not null ,
    controller_class         varchar(50) ,
    share_button_class       varchar(50) ,
    title_class              varchar(50) ,
    sub_title_class          varchar(50) ,
    tag_title_class          varchar(50) ,
    created_at               timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at               timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at               timestamp(0)                           null ,
    constraint FK_portfolio_main_visual_theme_main_visual_id foreign key (portfolio_main_visual_id) references portfolio_main_visual (id)
);


--## 메인 비주얼 태그
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_main_visual_tag
(
    id             varchar(50)                        primary key,
    main_visual_id varchar(50)                        not null ,
    content        varchar(50) ,
    created_at     timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at     timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at     timestamp(0)                           null ,
    constraint FK_main_visual_id foreign key (main_visual_id) references portfolio_main_visual (id)
);


--## 포트폴리오 작품
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_art_work
(
    id           varchar(50)                        primary key,
    portfolio_id varchar(50)                        not null ,
    title        varchar(50) ,
    description  varchar(255) ,
    created_at   timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at   timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at   timestamp(0)                           null ,
    constraint FK_portfolio_art_work_portfolio_id foreign key (portfolio_id) references portfolio (id)
);


--## 포트폴리오 작품 블록
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_art_work_block
(
    id                    varchar(50)                           primary key,
    portfolio_art_work_id varchar(50)                           not null ,
    block_type            varchar(50) default 'image'           not null ,
    sort_number           int         default 0                 not null ,
    title                 varchar(50) ,
    description           varchar(255) ,
    visibility            smallint  default 1                 not null ,
    created_at            timestamp(0)    default CURRENT_TIMESTAMP not null ,
    updated_at            timestamp(0)    default CURRENT_TIMESTAMP not null ,
    deleted_at            timestamp(0)                              null ,
    constraint FK_portfolio_art_work_block_portfolio_art_work_id foreign key (portfolio_art_work_id) references portfolio_art_work (id)
);


--## 포트폴리오 작품 블록 사진
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_art_work_block_picture
(
    id                          varchar(50)                        primary key,
    portfolio_art_work_block_id varchar(50)                        not null ,
    url                         text                               not null ,
    sort_number                 int      default 0                 not null ,
    created_at                  timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at                  timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at                  timestamp(0) ,
    constraint FK_portfolio_art_work_block_picture_portfolio_art_work_block_id foreign key (portfolio_art_work_block_id) references portfolio_art_work_block (id)
);


--# 파일
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table file
(
    id            varchar(50)                        primary key,
    author_id       varchar(50)                        not null ,
    url           varchar(255)                       not null ,
    original_name varchar(255)                       null ,
    encoding      varchar(50)                        null ,
    mimetype      varchar(50)                        null ,
    size          int                                null ,
    bucket        varchar(50)                        not null ,
    key         varchar(255)                       not null ,
    acl           varchar(50)                        null ,
    location      varchar(255)                       null ,
    etag          varchar(50)                        null ,
    versionId     varchar(50)                        null ,
    created_at    timestamp(0) default CURRENT_TIMESTAMP not null ,
    constraint FK_file_author_id foreign key (author_id) references author (id)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
create index url on file (url);
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create index id on file (id);
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create index autho_id on file (author_id);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
select *
from file;


--## 포트폴리오 사용자 노출 정보
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table author_profile
(
    id                varchar(50)                        primary key,
    author_id           varchar(50)                        not null ,
    profile_image_url text ,
    nick_name         varchar(50) ,
    phone_number      varchar(50) ,
    email             varchar(200) ,
    created_at        timestamp default CURRENT_TIMESTAMP not null ,
    updated_at        timestamp default CURRENT_TIMESTAMP not null ,
    deleted_at        timestamp ,
    constraint FK_author_profile_author_id foreign key (author_id) references author (id)
);


--## 포트폴리오 작가이력
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history
(
    id           varchar(50)                        primary key,
    portfolio_id varchar(50)                        not null ,
    title        varchar(50)                        null ,
    description  varchar(255)                       null ,
    created_at   timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at   timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at   timestamp(0)                           null ,
    constraint FK_portfolio_history_portfolio_id
        foreign key (portfolio_id) references portfolio (id)
);


--## 포트폴리오 작가이력 > 기본 정보
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_general
(
    id                             varchar(50)                        primary key,
    portfolio_portfolio_history_id varchar(50)                        not null ,
    profile_image_url              text                               null ,
    title                          varchar(50)                        null ,
    description                    varchar(255)                       null ,
    created_at                     timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at                     timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at                     timestamp(0)                           null ,
    constraint FK_portfolio_history_general_portfolio_history_id foreign key (portfolio_portfolio_history_id) references portfolio_history (id)
);


--## 포트폴리오 작가이력 > 전시이력
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_exhibition
(
    id                             varchar(50)                        primary key,
    portfolio_portfolio_history_id varchar(50)                        not null ,
    title                          varchar(50)                        null ,
    created_at                     timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at                     timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at                     timestamp(0)                           null ,
    constraint FK_portfolio_history_exhibition_portfolio_history_id foreign key (portfolio_portfolio_history_id) references portfolio_history (id)
);


--## 포트폴리오 작가이력 > 전시이력 > 연도
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_exhibition_year
(
    id                              varchar(50)                        primary key,
    portfolio_history_exhibition_id varchar(50)                        not null ,
    period                        varchar(50)                        null ,
    created_at                      timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at                      timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at                      timestamp(0)                           null ,
    constraint FK_exhibition_year_portfolio_history_exhibition_id foreign key (portfolio_history_exhibition_id) references portfolio_history_exhibition (id)
);

--## 포트폴리오 작가이력 > 전시이력 > 연도 > 연도별 내용
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_exhibition_year_content
(
    id                                   varchar(50)                        primary key,
    portfolio_history_exhibition_year_id varchar(50)                        not null ,
    content                              varchar(255)                       null ,
    created_at                           timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at                           timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at                           timestamp(0)                           null ,
    constraint FK_exhibition_year_content_exhibition_year_id foreign key (portfolio_history_exhibition_year_id) references portfolio_history_exhibition_year (id)
);


--## 포트폴리오 작가이력 > 학력정보
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_education
(
    id                   varchar(50)                        primary key,
    portfolio_history_id varchar(50)                        not null ,
    created_at           timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at           timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at           timestamp(0)                           null ,
    constraint FK_history_education_history_id foreign key (portfolio_history_id) references portfolio_history (id)
);


--## 포트폴리오 작가이력 > 학력정보 > 연도
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_education_year
(
    id                             varchar(50)                        primary key,
    portfolio_history_education_id varchar(50)                        not null ,
    period                       varchar(50) ,
    created_at                     timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at                     timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at                     timestamp(0)                           null ,
    constraint FK_history_education_year_education_id foreign key (portfolio_history_education_id) references portfolio_history_education (id)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_education_year_content
(
    id                                  varchar(50)                        primary key,
    portfolio_history_education_year_id varchar(50)                        not null ,
    content                             varchar(255) ,
    created_at                          timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at                          timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at                          timestamp(0)                           null ,
    constraint FK_history_education_year_content_education_year_id foreign key (portfolio_history_education_year_id) references portfolio_history_education_year (id)
);


--## 포트폴리오 작가이력 > 수상내역
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_award
(
    id                   varchar(50)                        primary key,
    portfolio_history_id varchar(50)                        not null ,
    created_at           timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at           timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at           timestamp(0)                           null ,
    constraint FK_history_award_history_id foreign key (portfolio_history_id) references portfolio_history (id)
);


--## 포트폴리오 작가이력 > 수상내역 > 연도
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_award_year
(
    id                         varchar(50)                        primary key,
    portfolio_history_award_id varchar(50)                        not null ,
    period                   varchar(50) ,
    created_at                 timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at                 timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at                 timestamp(0)                           null ,
    constraint FK_history_award_year_award_id foreign key (portfolio_history_award_id) references portfolio_history_award (id)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_award_year_content
(
    id                              varchar(50)                        primary key,
    portfolio_history_award_year_id varchar(50)                        not null ,
    content                         varchar(255) ,
    created_at                      timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at                      timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at                      timestamp(0)                           null ,
    constraint FK_history_award_year_content_award_year_id foreign key (portfolio_history_award_year_id) references portfolio_history_award_year (id)
);


--## 포트폴리오 기타이력
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_etc
(
    id                   varchar(50)                        primary key,
    portfolio_history_id varchar(50)                        not null ,
    content_title        varchar(255)                       ,
    created_at           timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at           timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at           timestamp(0)                           null ,
    constraint FK_history_etc_history_id foreign key (portfolio_history_id) references portfolio_history (id)
);

--## 포트폴리오 > 기타이력 > 내용
-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table portfolio_history_etc_item
(
    id                   varchar(50)                        primary key,
    portfolio_history_etc_id varchar(50)                        not null ,
    period        varchar(255)                       ,
    content        varchar(255)                       ,
    created_at           timestamp(0) default CURRENT_TIMESTAMP not null ,
    updated_at           timestamp(0) default CURRENT_TIMESTAMP not null ,
    deleted_at           timestamp(0)                           null ,
    constraint FK_history_etc_item_history_etc_id foreign key (portfolio_history_etc_id) references portfolio_history_etc (id)
);
