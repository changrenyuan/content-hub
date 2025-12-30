import { eq, and, SQL, like, sql, desc, asc, ilike } from "drizzle-orm";
import { getDb } from "./db";
import { contents, categories, insertContentSchema, updateContentSchema } from "./shared/schema";
import type { Content, InsertContent, UpdateContent, Category } from "./shared/schema";

export class ContentManager {
  async createContent(data: InsertContent): Promise<Content> {
    const db = await getDb();
    const validated = insertContentSchema.parse(data);
    const [content] = await db.insert(contents).values(validated).returning();
    return content;
  }

  async getContents(options: { 
    skip?: number; 
    limit?: number; 
    filters?: Partial<Pick<Content, 'id' | 'categoryId' | 'published' | 'featured'>>
    search?: string;
    categoryId?: string;
    includeUnpublished?: boolean;
    orderBy?: 'createdAt' | 'updatedAt' | 'viewCount' | 'likeCount' | 'sort';
    orderDirection?: 'asc' | 'desc';
    featured?: boolean;
  } = {}): Promise<Content[]> {
    const { 
      skip = 0, 
      limit = 20, 
      filters = {}, 
      search,
      includeUnpublished = false,
      orderBy = 'sort',
      orderDirection = 'desc',
      featured = undefined
    } = options;
    const db = await getDb();

    const conditions: SQL[] = [];
    if (filters.id !== undefined) {
      conditions.push(eq(contents.id, filters.id));
    }
    if (filters.categoryId !== undefined && filters.categoryId !== null) {
      conditions.push(eq(contents.categoryId, filters.categoryId));
    }
    if (options.categoryId) {
      conditions.push(eq(contents.categoryId, options.categoryId));
    }
    if (!includeUnpublished) {
      conditions.push(eq(contents.published, true));
    } else if (filters.published !== undefined) {
      conditions.push(eq(contents.published, filters.published));
    }
    if (filters.featured !== undefined) {
      conditions.push(eq(contents.featured, filters.featured));
    }
    if (featured !== undefined) {
      conditions.push(eq(contents.featured, featured));
    }
    if (search) {
      conditions.push(
        sql`(${contents.title} ILIKE ${'%' + search + '%'} OR ${contents.description} ILIKE ${'%' + search + '%'})`
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Determine order
    const orderField = contents[orderBy as keyof typeof contents] as any;
    const orderDirectionFn = orderDirection === 'asc' ? asc : desc;

    return db
      .select()
      .from(contents)
      .where(whereClause)
      .orderBy(orderDirectionFn(orderField), desc(contents.createdAt))
      .limit(limit)
      .offset(skip);
  }

  async getContentById(id: string): Promise<Content | null> {
    const db = await getDb();
    const [content] = await db.select().from(contents).where(eq(contents.id, id));
    return content || null;
  }

  async getContentByIdWithCategory(id: string): Promise<any | null> {
    const db = await getDb();
    const [content] = await db
      .select({
        id: contents.id,
        title: contents.title,
        description: contents.description,
        content: contents.content,
        imageUrl: contents.imageUrl,
        sourceUrl: contents.sourceUrl,
        categoryId: contents.categoryId,
        tags: contents.tags,
        featured: contents.featured,
        published: contents.published,
        viewCount: contents.viewCount,
        likeCount: contents.likeCount,
        sort: contents.sort,
        createdAt: contents.createdAt,
        updatedAt: contents.updatedAt,
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          color: categories.color,
          icon: categories.icon,
        }
      })
      .from(contents)
      .leftJoin(categories, eq(contents.categoryId, categories.id))
      .where(eq(contents.id, id));
    return content || null;
  }

  async getContentsByCategory(slug: string, options: {
    skip?: number;
    limit?: number;
    featured?: boolean;
  } = {}): Promise<any[]> {
    const { skip = 0, limit = 20, featured = undefined } = options;
    const db = await getDb();

    const conditions: SQL[] = [
      eq(categories.slug, slug),
      eq(contents.published, true),
    ];

    if (featured !== undefined) {
      conditions.push(eq(contents.featured, featured));
    }

    return db
      .select({
        id: contents.id,
        title: contents.title,
        description: contents.description,
        imageUrl: contents.imageUrl,
        categoryId: contents.categoryId,
        tags: contents.tags,
        featured: contents.featured,
        published: contents.published,
        viewCount: contents.viewCount,
        likeCount: contents.likeCount,
        sort: contents.sort,
        createdAt: contents.createdAt,
        updatedAt: contents.updatedAt,
      })
      .from(contents)
      .innerJoin(categories, eq(contents.categoryId, categories.id))
      .where(and(...conditions))
      .orderBy(desc(contents.featured), desc(contents.createdAt))
      .limit(limit)
      .offset(skip);
  }

  async updateContent(id: string, data: UpdateContent): Promise<Content | null> {
    const db = await getDb();
    const validated = updateContentSchema.parse(data);
    const [content] = await db
      .update(contents)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(contents.id, id))
      .returning();
    return content || null;
  }

  async incrementViewCount(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db
      .update(contents)
      .set({ 
        viewCount: sql`${contents.viewCount} + 1`,
        updatedAt: new Date()
      })
      .where(eq(contents.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async incrementLikeCount(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db
      .update(contents)
      .set({ 
        likeCount: sql`${contents.likeCount} + 1`,
        updatedAt: new Date()
      })
      .where(eq(contents.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async deleteContent(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.delete(contents).where(eq(contents.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getFeaturedContents(limit = 6): Promise<Content[]> {
    const db = await getDb();
    return db
      .select()
      .from(contents)
      .where(and(eq(contents.featured, true), eq(contents.published, true)))
      .orderBy(desc(contents.sort), desc(contents.createdAt))
      .limit(limit);
  }

  async getRecentContents(limit = 10): Promise<Content[]> {
    const db = await getDb();
    return db
      .select()
      .from(contents)
      .where(eq(contents.published, true))
      .orderBy(desc(contents.createdAt))
      .limit(limit);
  }

  async getPublishedContents(limit = 20): Promise<Content[]> {
    const db = await getDb();
    return db
      .select()
      .from(contents)
      .where(eq(contents.published, true))
      .orderBy(desc(contents.createdAt))
      .limit(limit);
  }

  async getPopularContents(limit = 10): Promise<Content[]> {
    const db = await getDb();
    return db
      .select()
      .from(contents)
      .where(eq(contents.published, true))
      .orderBy(desc(contents.viewCount), desc(contents.likeCount))
      .limit(limit);
  }
}

export const contentManager = new ContentManager();