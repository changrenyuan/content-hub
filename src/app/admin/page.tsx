import { contentManager, categoryManager, commentManager } from "@/storage/database";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

// Force dynamic rendering to avoid build-time database connection issues
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Fetch dashboard stats
  const [allContents, allCategories, pendingComments, featuredContents] = await Promise.all([
    contentManager.getContents({ includeUnpublished: true, limit: 1000 }),
    categoryManager.getCategories({ includeInactive: true, limit: 1000 }),
    commentManager.getPendingComments(),
    contentManager.getContents({ featured: true, limit: 1000 }),
  ]);

  const stats = {
    totalContents: allContents.length,
    publishedContents: allContents.filter(c => c.published).length,
    featuredContents: featuredContents.length,
    totalCategories: allCategories.length,
    activeCategories: allCategories.filter(c => c.isActive).length,
    totalComments: 0, // We'll need to implement this method
    pendingComments: pendingComments.length,
    totalViews: allContents.reduce((sum, c) => sum + c.viewCount, 0),
    totalLikes: allContents.reduce((sum, c) => sum + c.likeCount, 0),
  };

  const recentContents = allContents
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentComments = pendingComments.slice(0, 5);

  return (
    <AdminDashboard
      stats={stats}
      recentContents={recentContents}
      recentComments={recentComments}
      categories={allCategories}
    />
  );
}