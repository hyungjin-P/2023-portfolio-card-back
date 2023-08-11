##############################################
####################  DDL  ###################
##############################################

### 사용자
create table `crackit-portfolio`.author
(
    id          varchar(50)                          not null comment 'id'
        primary key,
    provider    varchar(255)                         null,
    provider_id varchar(255)                         null,
    name        varchar(50)                          null,
    password    varchar(50)                          null,
    email       varchar(100)                         null,
--    created_at  datetime   default CURRENT_TIMESTAMP null,
--    updated_at  datetime   default CURRENT_TIMESTAMP null,
    deleted_at  datetime                             null,
    is_lock     tinyint(1) default 0                 null
) comment '유저';


### 작가 포트폴리오
create table `crackit-portfolio`.portfolio
(
    id          varchar(50)                        not null comment '아이디#UUID' primary key,
    author_id     varchar(50)                        not null comment '사용자 아이디',
    title       varchar(50) comment '포트폴리오 타이틀',
    description varchar(255) comment '포트폴리오 설명',
    created_at  datetime default CURRENT_TIMESTAMP not null comment '생성일시',
    updated_at  datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '수정일시',
    deleted_at  datetime                           null comment '삭제일시',
    constraint FK_portfolio_art_work_author foreign key (author_id) references `crackit-portfolio`.author (id)
) comment '작가 포트폴리오';


### 작가 포트폴리오 > 메인 비주얼
create table `crackit-portfolio`.portfolio_main_visual
(
    id              varchar(50)                        not null comment '아이디#UUID' primary key,
    portfolio_id    varchar(50)                        not null comment '사용자 아이디',
    main_visual_url varchar(50)                        not null comment '사용자 아이디',
    name            varchar(50) comment '작가 이름',
    nick_name       varchar(50) comment '작가 활동명',
    sub_title       varchar(50) comment '서브타이틀',
    created_at      datetime default CURRENT_TIMESTAMP not null comment '생성일시',
    updated_at      datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '수정일시',
    deleted_at      datetime                           null comment '삭제일시',
    constraint FK_portfolio_id foreign key (portfolio_id) references `crackit-portfolio`.portfolio (id)
) comment '작가 메인 비주얼';


### 메인 비주얼 테마
create table `crackit-portfolio`.portfolio_main_visual_theme
(
    id                       varchar(50)                        not null comment '아이디#UUID' primary key,
    portfolio_main_visual_id varchar(50)                        not null comment '메인 비주얼 ID',
    controller_class         varchar(50) comment '메인 비주얼 컨트롤러 css 클래스',
    share_button_class       varchar(50) comment '공유하기 버튼 css 클래스',
    title_class              varchar(50) comment '메인 타이틀 css 클래스',
    sub_title_class          varchar(50) comment '서브 타이틀 css 클래스',
    tag_title_class          varchar(50) comment '태그 css 클래스',
    created_at               datetime default CURRENT_TIMESTAMP not null comment '생성일시',
    updated_at               datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '수정일시',
    deleted_at               datetime                           null comment '삭제일시',
    constraint FK_portfolio_main_visual_theme_main_visual_id foreign key (portfolio_main_visual_id) references `crackit-portfolio`.portfolio_main_visual (id)
) comment '포트폴리오 메인 비주얼 테마';


### 메인 비주얼 태그
create table `crackit-portfolio`.portfolio_main_visual_tag
(
    id             varchar(50)                        not null comment '아이디#UUID' primary key,
    main_visual_id varchar(50)                        not null comment '사용자 아이디',
    content        varchar(50) comment '서브타이틀',
    created_at     datetime default CURRENT_TIMESTAMP not null comment '생성일시',
    updated_at     datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '수정일시',
    deleted_at     datetime                           null comment '삭제일시',
    constraint FK_main_visual_id foreign key (main_visual_id) references `crackit-portfolio`.portfolio_main_visual (id)
) comment '작가 포트폴리오 메인 비주얼 태그';


### 포트폴리오 작품
create table `crackit-portfolio`.portfolio_main_visual_tag
(
    id             varchar(50)                        not null comment '아이디#UUID' primary key,
    main_visual_id varchar(50)                        not null comment '사용자 아이디',
    content        varchar(50) comment '서브타이틀',
    created_at     datetime default CURRENT_TIMESTAMP not null comment '생성일시',
    updated_at     datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '수정일시',
    deleted_at     datetime                           null comment '삭제일시',
    constraint FK_main_visual_id foreign key (main_visual_id) references `crackit-portfolio`.portfolio_main_visual (id)
) comment '작가 포트폴리오 메인 비주얼 태그';


### 포트폴리오 작품
create table `crackit-portfolio`.portfolio_art_work
(
    id           varchar(50)                        not null comment '아이디#UUID' primary key,
    portfolio_id varchar(50)                        not null comment '포트폴리오 아이디',
    title        varchar(50) comment '포트폴리오 타이틀',
    description  varchar(255) comment '포트폴리오 설명',
    created_at   datetime default CURRENT_TIMESTAMP not null comment '생성일시',
    updated_at   datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '수정일시',
    deleted_at   datetime                           null comment '삭제일시',
    constraint FK_portfolio_art_work_portfolio_id foreign key (portfolio_id) references `crackit-portfolio`.portfolio (id)
) comment '작가 포트폴리오 작품 블록';


### 포트폴리오 작품 블록
create table `crackit-portfolio`.portfolio_art_work_block
(
    id                    varchar(50) auto_increment            not null comment '아이디#UUID' primary key,
    portfolio_art_work_id varchar(50)                           not null comment '포트폴리오 작품 아이디',
    block_type            varchar(50) default 'image'           not null comment '블록타입 (1. image, 2. text) ※ 추가 될 수 있음',
    sort_number           int         default 0                 not null comment '정렬순서',
    title                 varchar(50) comment '작품 제목',
    description           varchar(255) comment '작품 설명',
    visibility            tinyint(1)  default 1                 not null comment '표시 여부',
    created_at            datetime    default CURRENT_TIMESTAMP not null comment '생성일시',
    updated_at            datetime    default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '수정일시',
    deleted_at            datetime                              null comment '삭제일시',
    constraint FK_portfolio_art_work_block_portfolio_art_work_id foreign key (portfolio_art_work_id) references `crackit-portfolio`.portfolio_art_work (id)
) comment '작가 포트폴리오 작품 블록';


### 포트폴리오 작품 블록 사진
create table `crackit-portfolio`.portfolio_art_work_block_picture
(
    id                          varchar(50)                        not null comment '아이디#UUID' primary key,
    portfolio_art_work_block_id varchar(50)                        not null comment '포트폴리오 작품 블록 아이디',
    url                         text                               not null comment '작품 image url',
    sort_number                 int      default 0                 not null comment '정렬순서',
    created_at                  datetime default CURRENT_TIMESTAMP not null comment '생성일시',
    updated_at                  datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '수정일시',
    deleted_at                  datetime comment '삭제일시',
    constraint FK_portfolio_art_work_block_picture_portfolio_art_work_block_id foreign key (portfolio_art_work_block_id) references `crackit-portfolio`.portfolio_art_work_block (id)
) comment '작가 포트폴리오 작품 블록 사진';


## 파일
create table `crackit-portfolio`.file
(
    id            varchar(50)                        not null comment '아이디#UUID' primary key,
    author_id       varchar(50)                        not null comment '사용자 아이디',
    url           varchar(255)                       not null comment 'URL',
    original_name varchar(255)                       null comment 'Name of the file on the author''s computer	',
    encoding      varchar(50)                        null comment 'Encoding type of the file	',
    mimetype      varchar(50)                        null comment 'Mime type of the file	',
    size          int                                null comment 'Size of the file in bytes',
    bucket        varchar(50)                        not null comment 'The bucket used to store the file',
    `key`         varchar(255)                       not null comment 'The name of the file',
    acl           varchar(50)                        null comment 'Access control for the file',
    location      varchar(255)                       null comment 'The S3 url to access the file',
    etag          varchar(50)                        null comment 'The etagof the uploaded file in S3',
    versionId     varchar(50)                        null comment 'The versionId is an optional param returned by S3 for versioned buckets.',
    created_at    datetime default CURRENT_TIMESTAMP not null comment '생성일시',
    constraint FK_file_author_id foreign key (author_id) references `crackit-portfolio`.author (id)
) comment '파일';

create index url on `crackit-portfolio`.file (url);
create index id on `crackit-portfolio`.file (id);
create index author_id on `crackit-portfolio`.file (author_id);

select *
from file;


### 포트폴리오 사용자 노출 정보
create table `crackit-portfolio`.author_profile
(
    id               varchar(50)                        not null comment '아이디#UUID' primary key,
    author_id          varchar(50)                        not null comment '사용자 id',
    profile_image_url text                               comment '작가 프로필 사진',
    nick_name   varchar(50) comment '닉네임',
    phone_number varchar(50) comment '휴대전화 번호',
    email varchar(200) comment '이메일 주소',
    created_at       datetime default CURRENT_TIMESTAMP not null comment '생성일시',
    updated_at       datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '수정일시',
    deleted_at       datetime comment '삭제일시',
    constraint FK_author_profile_author_id foreign key (author_id) references `crackit-portfolio`.author(id)
) comment '사용자 프로필 (포트폴리오 노출 정보)';
