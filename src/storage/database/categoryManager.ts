import { eq, and, SQL, like, sql, desc, asc } from "drizzle-orm";
import { getDb } from "./db";
import { categories, insertCategorySchema, updateCategorySchema } from "./shared/schema";
import type { Category, InsertCategory, UpdateCategory } from "./shared/schema";

export class CategoryManager {
  async createCategory(data: InsertCategory): Promise<Category> {
    const db = await getDb();
    const validated = insertCategorySchema.parse(data);
    const [category] = await db.insert(categories).values(validated).returning();
    return category;
  }

  async getCategories(options: { 
    skip?: number; 
    limit?: number; 
    filters?: Partial<Pick<Category, 'id' | 'name' | 'slug' | 'isActive'>>
    includeInactive?: boolean;
  } = {}): Promise<Category[]> {
    const { skip = 0, limit = 100, filters = {}, includeInactive = false } = options;
    const db = await getDb();

    const conditions: SQL[] = [];
    if (filters.id !== undefined) {
      conditions.push(eq(categories.id, filters.id));
    }
    if (filters.name !== undefined) {
      conditions.push(like(categories.name, `%${filters.name}%`));
    }
    if (filters.slug !== undefined) {
      conditions.push(eq(categories.slug, filters.slug));
    }
    if (!includeInactive) {
      conditions.push(eq(categories.isActive, true));
    } else if (filters.isActive !== undefined) {
      conditions.push(eq(categories.isActive, filters.isActive));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    return db
      .select()
      .from(categories)
      .where(whereClause)
      .orderBy(asc(categories.sort), asc(categories.name))
      .limit(limit)
      .offset(skip);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const db = await getDb();
    const [category] = await db
      .select()
      .from(categories)
      .where(and(eq(categories.slug, slug), eq(categories.isActive, true)));
    return category || null;
  }

  async getCategoryById(id: string): Promise<Category | null> {
    const db = await getDb();
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));
    return category || null;
  }

  async updateCategory(id: string, data: UpdateCategory): Promise<Category | null> {
    const db = await getDb();
    const validated = updateCategorySchema.parse(data);
    const [category] = await db
      .update(categories)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return category || null;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.delete(categories).where(eq(categories.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getCategoryOptions(): Promise<{ id: string; name: string; slug: string }[]> {
    const db = await getDb();
    return db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug
      })
      .from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(asc(categories.sort), asc(categories.name));
  }
}

export const categoryManager = new CategoryManager();