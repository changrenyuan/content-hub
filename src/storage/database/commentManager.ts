import { eq, and, SQL, like, sql, desc, asc } from "drizzle-orm";
import { getDb } from "./db";
import { comments, contents, insertCommentSchema, updateCommentSchema } from "./shared/schema";
import type { Comment, InsertComment, UpdateComment } from "./shared/schema";

export class CommentManager {
  async createComment(data: InsertComment): Promise<Comment> {
    const db = await getDb();
    const validated = insertCommentSchema.parse(data);
    const [comment] = await db.insert(comments).values(validated).returning();
    return comment;
  }

  async getComments(options: { 
    skip?: number; 
    limit?: number; 
    filters?: Partial<Pick<Comment, 'id' | 'contentId' | 'authorEmail' | 'isApproved' | 'parentId'>>
    includeUnapproved?: boolean;
    onlyApproved?: boolean;
  } = {}): Promise<Comment[]> {
    const { 
      skip = 0, 
      limit = 100, 
      filters = {}, 
      includeUnapproved = false,
      onlyApproved = true
    } = options;
    const db = await getDb();

    const conditions: SQL[] = [];
    if (filters.id !== undefined) {
      conditions.push(eq(comments.id, filters.id));
    }
    if (filters.contentId !== undefined) {
      conditions.push(eq(comments.contentId, filters.contentId));
    }
    if (filters.authorEmail !== undefined) {
      conditions.push(eq(comments.authorEmail, filters.authorEmail));
    }
    if (filters.parentId !== undefined && filters.parentId !== null) {
      conditions.push(eq(comments.parentId, filters.parentId));
    }
    
    if (onlyApproved) {
      conditions.push(eq(comments.isApproved, true));
    } else if (filters.isApproved !== undefined) {
      conditions.push(eq(comments.isApproved, filters.isApproved));
    } else if (!includeUnapproved) {
      conditions.push(eq(comments.isApproved, true));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    return db
      .select()
      .from(comments)
      .where(whereClause)
      .orderBy(asc(comments.parentId), asc(comments.createdAt))
      .limit(limit)
      .offset(skip);
  }

  async getCommentById(id: string): Promise<Comment | null> {
    const db = await getDb();
    const [comment] = await db.select().from(comments).where(eq(comments.id, id));
    return comment || null;
  }

  async getCommentsByContentId(contentId: string, approvedOnly = true): Promise<Comment[]> {
    const db = await getDb();
    const conditions = [eq(comments.contentId, contentId)];
    
    if (approvedOnly) {
      conditions.push(eq(comments.isApproved, true));
    }

    return db
      .select()
      .from(comments)
      .where(and(...conditions))
      .orderBy(asc(comments.createdAt));
  }

  async getCommentsByContentIdWithReplies(contentId: string, approvedOnly = true): Promise<Comment[]> {
    const db = await getDb();
    const conditions = [eq(comments.contentId, contentId)];
    
    if (approvedOnly) {
      conditions.push(eq(comments.isApproved, true));
    }

    return db
      .select()
      .from(comments)
      .where(and(...conditions))
      .orderBy(asc(comments.parentId), asc(comments.createdAt));
  }

  async updateComment(id: string, data: UpdateComment): Promise<Comment | null> {
    const db = await getDb();
    const validated = updateCommentSchema.parse(data);
    const [comment] = await db
      .update(comments)
      .set({ ...validated, updatedAt: new Date() })
      .where(eq(comments.id, id))
      .returning();
    return comment || null;
  }

  async approveComment(id: string): Promise<Comment | null> {
    const db = await getDb();
    const [comment] = await db
      .update(comments)
      .set({ isApproved: true, updatedAt: new Date() })
      .where(eq(comments.id, id))
      .returning();
    return comment || null;
  }

  async deleteComment(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.delete(comments).where(eq(comments.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getPendingComments(): Promise<Comment[]> {
    const db = await getDb();
    return db
      .select()
      .from(comments)
      .where(eq(comments.isApproved, false))
      .orderBy(desc(comments.createdAt));
  }

  async getCommentStats(contentId: string): Promise<{ total: number; approved: number; pending: number }> {
    const db = await getDb();
    
    const [stats] = await db
      .select({
        total: sql<number>`count(*)`.mapWith(Number),
        approved: sql<number>`count(*) filter (where ${comments.isApproved} = true)`.mapWith(Number),
        pending: sql<number>`count(*) filter (where ${comments.isApproved} = false)`.mapWith(Number),
      })
      .from(comments)
      .where(eq(comments.contentId, contentId));

    return {
      total: stats?.total || 0,
      approved: stats?.approved || 0,
      pending: stats?.pending || 0,
    };
  }

  async getContentsWithComments(limit = 10): Promise<Array<{ contentId: string; commentCount: number }>> {
    const db = await getDb();
    return db
      .select({
        contentId: comments.contentId,
        commentCount: sql<number>`count(*)`.mapWith(Number),
      })
      .from(comments)
      .where(eq(comments.isApproved, true))
      .groupBy(comments.contentId)
      .orderBy(desc(sql`count(*)`))
      .limit(limit);
  }
}

export const commentManager = new CommentManager();