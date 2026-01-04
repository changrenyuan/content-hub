import Link from 'next/link';
import {
  FileText,
  Folder,
  MessageSquare,
  Eye,
  Heart,
  TrendingUp,
  Plus,
  BarChart3,
  Settings,
  Download
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface DashboardStats {
  totalContents: number;
  publishedContents: number;
  featuredContents: number;
  totalCategories: number;
  activeCategories: number;
  totalComments: number;
  pendingComments: number;
  totalViews: number;
  totalLikes: number;
}

interface AdminDashboardProps {
  stats: DashboardStats;
  recentContents: any[];
  recentComments: any[];
  categories: any[];
}

const AdminDashboard = ({ 
  stats, 
  recentContents, 
  recentComments, 
  categories 
}: AdminDashboardProps) => {
  const statCards = [
    {
      title: '总内容数',
      value: stats.totalContents,
      change: stats.publishedContents,
      changeLabel: '已发布',
      icon: FileText,
      color: 'bg-blue-500',
      link: '/admin/contents'
    },
    {
      title: '分类数量',
      value: stats.totalCategories,
      change: stats.activeCategories,
      changeLabel: '活跃分类',
      icon: Folder,
      color: 'bg-green-500',
      link: '/admin/categories'
    },
    {
      title: '评论总数',
      value: stats.totalComments,
      change: stats.pendingComments,
      changeLabel: '待审核',
      icon: MessageSquare,
      color: 'bg-purple-500',
      link: '/admin/comments'
    },
    {
      title: '总浏览量',
      value: stats.totalViews.toLocaleString(),
      change: stats.totalLikes.toLocaleString(),
      changeLabel: '总点赞',
      icon: TrendingUp,
      color: 'bg-orange-500',
      link: '/admin/analytics'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">管理后台</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/contents/new"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                添加内容
              </Link>
              <Link
                href="/admin/settings"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
              >
                <Settings className="h-4 w-4" />
                设置
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Link
              key={stat.title}
              href={stat.link}
              className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {stat.changeLabel}: {stat.change}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Link
              href="/admin/contents/new"
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              <Plus className="h-5 w-5 text-indigo-600" />
              <span className="font-medium text-gray-900">添加新内容</span>
            </Link>
            <Link
              href="/admin/categories/new"
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              <Folder className="h-5 w-5 text-green-600" />
              <span className="font-medium text-gray-900">创建分类</span>
            </Link>
            <Link
              href="/admin/comments?status=pending"
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-gray-900">审核评论</span>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              <BarChart3 className="h-5 w-5 text-orange-600" />
              <span className="font-medium text-gray-900">查看统计</span>
            </Link>
            <Link
              href="/admin/xiaohongshu"
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-red-300 hover:bg-red-50"
            >
              <Download className="h-5 w-5 text-red-600" />
              <span className="font-medium text-gray-900">小红书同步</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Recent Contents */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">最新内容</h2>
              <Link
                href="/admin/contents"
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                查看全部
              </Link>
            </div>
            <div className="space-y-4">
              {recentContents.length > 0 ? (
                recentContents.map((content) => (
                  <div key={content.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {content.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(content.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className={`px-2 py-1 rounded-full ${
                        content.published 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {content.published ? '已发布' : '草稿'}
                      </span>
                      {content.featured && (
                        <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
                          精选
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">暂无内容</p>
              )}
            </div>
          </div>

          {/* Recent Comments */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">待审核评论</h2>
              <Link
                href="/admin/comments?status=pending"
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                查看全部
              </Link>
            </div>
            <div className="space-y-4">
              {recentComments.length > 0 ? (
                recentComments.map((comment) => (
                  <div key={comment.id} className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {comment.authorName}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {comment.content}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">暂无待审核评论</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminDashboard };