CREATE TABLE "categories" (
	"id" varchar(36) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"color" varchar(7) DEFAULT '#6366f1',
	"icon" varchar(50),
	"is_active" boolean DEFAULT true NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" varchar(36) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_id" varchar(36) NOT NULL,
	"author_name" varchar(100) NOT NULL,
	"author_email" varchar(255) NOT NULL,
	"author_website" varchar(255),
	"content" text NOT NULL,
	"is_approved" boolean DEFAULT false NOT NULL,
	"parent_id" varchar(36),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "contents" (
	"id" varchar(36) PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"content" text,
	"image_url" varchar(500),
	"image_urls" jsonb,
	"source_url" varchar(500),
	"category_id" varchar(36),
	"tags" jsonb,
	"featured" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"like_count" integer DEFAULT 0 NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "comments_content_id_idx" ON "comments" USING btree ("content_id");--> statement-breakpoint
CREATE INDEX "comments_is_approved_idx" ON "comments" USING btree ("is_approved");--> statement-breakpoint
CREATE INDEX "contents_category_id_idx" ON "contents" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "contents_published_idx" ON "contents" USING btree ("published");--> statement-breakpoint
CREATE INDEX "contents_featured_idx" ON "contents" USING btree ("featured");