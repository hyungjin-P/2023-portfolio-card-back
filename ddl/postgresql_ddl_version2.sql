CREATE TABLE "author" (
  "id" varchar(50) PRIMARY KEY,
  "provider" varchar(255),
  "provider_id" varchar(255),
  "name" varchar(50),
  "password" varchar(50),
  "email" varchar(100),
  "authorLink" varchar(20),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp,
  "is_lock" smallint DEFAULT 0
);

CREATE TABLE "portfolio" (
  "id" varchar(50) PRIMARY KEY,
  "author_id" varchar(50) NOT NULL,
  "title" varchar(50),
  "description" varchar(255),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_main_visual" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_id" varchar(50) NOT NULL,
  "main_visual_url" varchar(255) NOT NULL,
  "name" varchar(50),
  "title" varchar(50),
  "sub_title" varchar(50),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_main_visual_theme" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_main_visual_id" varchar(50) NOT NULL,
  "controller_class" varchar(50),
  "share_button_class" varchar(50),
  "title_class" varchar(50),
  "sub_title_class" varchar(50),
  "tag_title_class" varchar(50),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_main_visual_tag" (
  "id" varchar(50) PRIMARY KEY,
  "main_visual_id" varchar(50) NOT NULL,
  "content" varchar(50),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_art_work" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_id" varchar(50) NOT NULL,
  "title" varchar(50),
  "description" varchar(255),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_art_work_block" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_art_work_id" varchar(50) NOT NULL,
  "block_type" varchar(50) NOT NULL DEFAULT 'image',
  "sort_number" int NOT NULL DEFAULT 0,
  "title" varchar(50),
  "description" varchar(255),
  "visibility" smallint NOT NULL DEFAULT 1,
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_art_work_block_picture" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_art_work_block_id" varchar(50) NOT NULL,
  "url" varchar(255) NOT NULL,
  "sort_number" int NOT NULL DEFAULT 0,
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "file" (
  "id" varchar(50) PRIMARY KEY,
  "author_id" varchar(50) NOT NULL,
  "url" varchar(255) NOT NULL,
  "original_name" varchar(255),
  "encoding" varchar(50),
  "mimetype" varchar(50),
  "size" int,
  "bucket" varchar(50) NOT NULL,
  "key" varchar(255) NOT NULL,
  "acl" varchar(50),
  "location" varchar(255),
  "etag" varchar(50),
  "versionId" varchar(50),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "portfolio_history" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_id" varchar(50) NOT NULL,
  "title" varchar(50),
  "description" varchar(255),
  "general_is_public" smallint DEFAULT 0,
  "contact_is_public" smallint DEFAULT 0,
  "education_is_public" smallint DEFAULT 0,
  "exhibition_is_public" smallint DEFAULT 0,
  "award_is_public" smallint DEFAULT 0,
  "etc_is_public" smallint DEFAULT 0,
  "sns_is_public" smallint DEFAULT 0,
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_general" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_id" varchar(50) NOT NULL,
  "general_image_url" varchar(255) NOT NULL,
  "nickname" varchar(50),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_contact" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_id" varchar(50) NOT NULL,
  "phone_number" varchar(50),
  "email" varchar(200),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_exhibition" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_id" varchar(50) NOT NULL,
  "title" varchar(50),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_exhibition_year" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_exhibition_id" varchar(50) NOT NULL,
  "period" varchar(50),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_exhibition_year_content" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_exhibition_year_id" varchar(50) NOT NULL,
  "content" varchar(255),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_education" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_id" varchar(50) NOT NULL,
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_education_year" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_education_id" varchar(50) NOT NULL,
  "period" varchar(50),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_education_year_content" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_education_year_id" varchar(50) NOT NULL,
  "content" varchar(255),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_award" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_id" varchar(50) NOT NULL,
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_award_year" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_award_id" varchar(50) NOT NULL,
  "period" varchar(50),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_award_year_content" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_award_year_id" varchar(50) NOT NULL,
  "content" varchar(255),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_etc" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_id" varchar(50) NOT NULL,
  "content_title" varchar(255),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_etc_item" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_etc_id" varchar(50) NOT NULL,
  "period" varchar(255),
  "content" varchar(255),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE TABLE "portfolio_history_sns" (
  "id" varchar(50) PRIMARY KEY,
  "portfolio_history_id" varchar(50) NOT NULL,
  "linkUrl" varchar(255) NOT NULL,
  "description" varchar(255),
  "created_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" timestamp(0) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "deleted_at" timestamp(0)
);

CREATE INDEX "url" ON "file" ("url");

CREATE INDEX "id" ON "file" ("id");

CREATE INDEX "autho_id" ON "file" ("author_id");

ALTER TABLE "portfolio" ADD CONSTRAINT "FK_portfolio_art_work_author" FOREIGN KEY ("author_id") REFERENCES "author" ("id");

ALTER TABLE "portfolio_main_visual" ADD CONSTRAINT "FK_portfolio_id" FOREIGN KEY ("portfolio_id") REFERENCES "portfolio" ("id");

ALTER TABLE "portfolio_main_visual_theme" ADD CONSTRAINT "FK_portfolio_main_visual_theme_main_visual_id" FOREIGN KEY ("portfolio_main_visual_id") REFERENCES "portfolio_main_visual" ("id");

ALTER TABLE "portfolio_main_visual_tag" ADD CONSTRAINT "FK_main_visual_id" FOREIGN KEY ("main_visual_id") REFERENCES "portfolio_main_visual" ("id");

ALTER TABLE "portfolio_art_work" ADD CONSTRAINT "FK_portfolio_art_work_portfolio_id" FOREIGN KEY ("portfolio_id") REFERENCES "portfolio" ("id");

ALTER TABLE "portfolio_art_work_block" ADD CONSTRAINT "FK_portfolio_art_work_block_portfolio_art_work_id" FOREIGN KEY ("portfolio_art_work_id") REFERENCES "portfolio_art_work" ("id");

ALTER TABLE "portfolio_art_work_block_picture" ADD CONSTRAINT "FK_portfolio_art_work_block_picture_portfolio_art_work_block_id" FOREIGN KEY ("portfolio_art_work_block_id") REFERENCES "portfolio_art_work_block" ("id");

ALTER TABLE "file" ADD CONSTRAINT "FK_file_author_id" FOREIGN KEY ("author_id") REFERENCES "author" ("id");

ALTER TABLE "portfolio_history" ADD CONSTRAINT "FK_portfolio_history_portfolio_id" FOREIGN KEY ("portfolio_id") REFERENCES "portfolio" ("id");

ALTER TABLE "portfolio_history_general" ADD CONSTRAINT "FK_portfolio_history_general_portfolio_history_id" FOREIGN KEY ("portfolio_history_id") REFERENCES "portfolio_history" ("id");

ALTER TABLE "portfolio_history_contact" ADD CONSTRAINT "FK_portfolio_history_contact_portfolio_history_id" FOREIGN KEY ("portfolio_history_id") REFERENCES "portfolio_history" ("id");

ALTER TABLE "portfolio_history_exhibition" ADD CONSTRAINT "FK_portfolio_history_exhibition_portfolio_history_id" FOREIGN KEY ("portfolio_history_id") REFERENCES "portfolio_history" ("id");

ALTER TABLE "portfolio_history_exhibition_year" ADD CONSTRAINT "FK_exhibition_year_portfolio_history_exhibition_id" FOREIGN KEY ("portfolio_history_exhibition_id") REFERENCES "portfolio_history_exhibition" ("id");

ALTER TABLE "portfolio_history_exhibition_year_content" ADD CONSTRAINT "FK_exhibition_year_content_exhibition_year_id" FOREIGN KEY ("portfolio_history_exhibition_year_id") REFERENCES "portfolio_history_exhibition_year" ("id");

ALTER TABLE "portfolio_history_education" ADD CONSTRAINT "FK_history_education_history_id" FOREIGN KEY ("portfolio_history_id") REFERENCES "portfolio_history" ("id");

ALTER TABLE "portfolio_history_education_year" ADD CONSTRAINT "FK_history_education_year_education_id" FOREIGN KEY ("portfolio_history_education_id") REFERENCES "portfolio_history_education" ("id");

ALTER TABLE "portfolio_history_education_year_content" ADD CONSTRAINT "FK_history_education_year_content_education_year_id" FOREIGN KEY ("portfolio_history_education_year_id") REFERENCES "portfolio_history_education_year" ("id");

ALTER TABLE "portfolio_history_award" ADD CONSTRAINT "FK_history_award_history_id" FOREIGN KEY ("portfolio_history_id") REFERENCES "portfolio_history" ("id");

ALTER TABLE "portfolio_history_award_year" ADD CONSTRAINT "FK_history_award_year_award_id" FOREIGN KEY ("portfolio_history_award_id") REFERENCES "portfolio_history_award" ("id");

ALTER TABLE "portfolio_history_award_year_content" ADD CONSTRAINT "FK_history_award_year_content_award_year_id" FOREIGN KEY ("portfolio_history_award_year_id") REFERENCES "portfolio_history_award_year" ("id");

ALTER TABLE "portfolio_history_etc" ADD CONSTRAINT "FK_history_etc_history_id" FOREIGN KEY ("portfolio_history_id") REFERENCES "portfolio_history" ("id");

ALTER TABLE "portfolio_history_etc_item" ADD CONSTRAINT "FK_history_etc_item_history_etc_id" FOREIGN KEY ("portfolio_history_etc_id") REFERENCES "portfolio_history_etc" ("id");

ALTER TABLE "portfolio_history_sns" ADD CONSTRAINT "FK_history_sns_history_id" FOREIGN KEY ("portfolio_history_id") REFERENCES "portfolio_history" ("id");
