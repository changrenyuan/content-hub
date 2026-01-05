import { contentManager } from "@/storage/database";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { cookies } from 'next/headers';
import Link from "next/link";
import { BarChart3, TrendingUp, Users, Eye, Heart, ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session?.value === 'authenticated';
}

export default async function AnalyticsPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const allContents = await contentManager.getContents({ includeUnpublished: true, limit: 1000 });

  const totalViews = allContents.reduce((sum, c) => sum + c.viewCount, 0);
  const totalLikes = allContents.reduce((sum, c) => sum + c.likeCount, 0);
  const publishedContents = allContents.filter(c => c.published).length;
  const unpublishedContents = allContents.filter(c => !c.published).length;

  const topContents = allContents
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">统计分析</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-100 p-3">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">总浏览量</p>
                <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-red-100 p-3">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">总点赞数</p>
                <p className="text-2xl font-bold text-gray-900">{totalLikes.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-100 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">已发布内容</p>
                <p className="text-2xl font-bold text-gray-900">{publishedContents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-orange-100 p-3">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">草稿箱</p>
                <p className="text-2xl font-bold text-gray-900">{unpublishedContents}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">热门内容 Top 10</h2>
          <div className="space-y-4">
            {topContents.length > 0 ? (
              topContents.map((content, index) => (
                <div key={content.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                    <div>
                      <p className="font-medium text-gray-900">{content.title}</p>
                      <p className="text-sm text-gray-500">发布于 {new Date(content.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{content.viewCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{content.likeCount}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">暂无内容数据</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
