import { Content, Category, Comment } from "@/storage/database";

export type { Content, Category, Comment };

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Content with category
export interface ContentWithCategory extends Content {
  category?: Category;
}

// Comment with replies
export interface CommentWithReplies extends Comment {
  replies?: CommentWithReplies[];
}

// Search filters
export interface ContentFilters {
  categoryId?: string;
  search?: string;
  featured?: boolean;
  tags?: string[];
  orderBy?: 'createdAt' | 'updatedAt' | 'viewCount' | 'likeCount' | 'sort';
  orderDirection?: 'asc' | 'desc';
}

// Admin dashboard stats
export interface DashboardStats {
  totalContents: number;
  totalCategories: number;
  totalComments: number;
  pendingComments: number;
  publishedContents: number;
  featuredContents: number;
  totalViews: number;
  totalLikes: number;
}

// Form types
export interface ContentFormData {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  sourceUrl: string;
  categoryId: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  sort: number;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  isActive: boolean;
  sort: number;
}

export interface CommentFormData {
  contentId: string;
  authorName: string;
  authorEmail: string;
  authorWebsite: string;
  content: string;
  parentId: string;
}

// Navigation types
export interface NavItem {
  href: string;
  label: string;
  icon?: string;
  isActive?: boolean;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}