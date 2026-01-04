import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { createSchemaFactory } from "drizzle-zod";
import { z } from "zod";

// 分类表
export const categories = pgTable(
  "categories",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    description: text("description"),
    color: varchar("color", { length: 7 }).default("#6366f1"), // hex color
    icon: varchar("icon", { length: 50 }),
    isActive: boolean("is_active").default(true).notNull(),
    sort: integer("sort").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    slugIdx: index("categories_slug_idx").on(table.slug),
  })
);

// 内容表
export const contents = pgTable(
  "contents",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    content: text("content"), // 详细内容
    imageUrl: varchar("image_url", { length: 500 }), // 封面图片（兼容单图）
    imageUrls: jsonb("image_urls").$type<string[]>(), // 所有图片URLs（支持多图）
    sourceUrl: varchar("source_url", { length: 500 }), // 原始链接
    categoryId: varchar("category_id", { length: 36 }),
    tags: jsonb("tags").$type<string[]>(), // 标签数组
    featured: boolean("featured").default(false).notNull(), // 是否精选
    published: boolean("published").default(true).notNull(), // 是否发布
    viewCount: integer("view_count").default(0).notNull(), // 浏览次数
    likeCount: integer("like_count").default(0).notNull(), // 点赞次数
    sort: integer("sort").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    categoryIdIdx: index("contents_category_id_idx").on(table.categoryId),
    publishedIdx: index("contents_published_idx").on(table.published),
    featuredIdx: index("contents_featured_idx").on(table.featured),
  })
);

// 评论表
export const comments = pgTable(
  "comments",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    contentId: varchar("content_id", { length: 36 }).notNull(),
    authorName: varchar("author_name", { length: 100 }).notNull(),
    authorEmail: varchar("author_email", { length: 255 }).notNull(),
    authorWebsite: varchar("author_website", { length: 255 }),
    content: text("content").notNull(),
    isApproved: boolean("is_approved").default(false).notNull(), // 是否审核通过
    parentId: varchar("parent_id", { length: 36 }), // 回复评论的父评论ID
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    contentIdIdx: index("comments_content_id_idx").on(table.contentId),
    isApprovedIdx: index("comments_is_approved_idx").on(table.isApproved),
  })
);

// 使用 createSchemaFactory 配置 date coercion
const { createInsertSchema: createCoercedInsertSchema } = createSchemaFactory({
  coerce: { date: true },
});

// Category schemas
export const insertCategorySchema = createCoercedInsertSchema(categories).pick({
  name: true,
  slug: true,
  description: true,
  color: true,
  icon: true,
  isActive: true,
  sort: true,
});

export const updateCategorySchema = createCoercedInsertSchema(categories)
  .pick({
    name: true,
    description: true,
    color: true,
    icon: true,
    isActive: true,
    sort: true,
  })
  .partial();

// Content schemas
export const insertContentSchema = createCoercedInsertSchema(contents).pick({
  title: true,
  description: true,
  content: true,
  imageUrl: true,
  imageUrls: true,
  sourceUrl: true,
  categoryId: true,
  tags: true,
  featured: true,
  published: true,
  sort: true,
});

export const updateContentSchema = createCoercedInsertSchema(contents)
  .pick({
    title: true,
    description: true,
    content: true,
    imageUrl: true,
    imageUrls: true,
    sourceUrl: true,
    categoryId: true,
    tags: true,
    featured: true,
    published: true,
    viewCount: true,
    likeCount: true,
    sort: true,
  })
  .partial();

// Comment schemas
export const insertCommentSchema = createCoercedInsertSchema(comments).pick({
  contentId: true,
  authorName: true,
  authorEmail: true,
  authorWebsite: true,
  content: true,
  parentId: true,
});

export const updateCommentSchema = createCoercedInsertSchema(comments)
  .pick({
    authorName: true,
    authorEmail: true,
    authorWebsite: true,
    content: true,
    isApproved: true,
  })
  .partial();

// TypeScript types
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;

export type Content = typeof contents.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;
export type UpdateContent = z.infer<typeof updateContentSchema>;

export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type UpdateComment = z.infer<typeof updateCommentSchema>;




