'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  StarOff,
  Filter
} from 'lucide-react';
import { Content } from '@/types';

interface ContentManagerProps {
  contents: Content[];
  currentPage: number;
  search: string;
  categoryId: string;
}

const ContentManager = ({ 
  contents, 
  currentPage,
  search,
  categoryId
}: ContentManagerProps) => {
  const [localContents, setLocalContents] = useState(contents);
  const [searchTerm, setSearchTerm] = useState(search);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (categoryId) params.set('category', categoryId);
    window.location.href = `/admin/contents?${params.toString()}`;
  };

  const handlePublish = async (id: string, published: boolean) => {
    try {
      const response = await fetch(`/api/admin/contents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !published }),
      });

      if (response.ok) {
        setLocalContents(prev =>
          prev.map(content =>
            content.id === id ? { ...content, published: !published } : content
          )
        );
      }
    } catch (error) {
      console.error('Failed to update content:', error);
    }
  };

  const handleFeature = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/admin/contents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !featured }),
      });

      if (response.ok) {
        setLocalContents(prev =>
          prev.map(content =>
            content.id === id ? { ...content, featured: !featured } : content
          )
        );
      }
    } catch (error) {
      console.error('Failed to update content:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个内容吗？')) return;

    try {
      const response = await fetch(`/api/admin/contents/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLocalContents(prev => prev.filter(content => content.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete content:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 mr-4">
                ← 返回
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">内容管理</h1>
            </div>
            <Link
              href="/admin/contents/new"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              添加内容
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索内容..."
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              筛选
            </button>
          </form>
        </div>
      </div>

      {/* Contents List */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {localContents.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {localContents.map((content) => (
                <div key={content.id} className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Thumbnail */}
                    {content.imageUrl && (
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={content.imageUrl}
                            alt={content.title}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Content Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link 
                              href={`/content/${content.id}`}
                              className="hover:text-indigo-600"
                              target="_blank"
                            >
                              {content.title}
                            </Link>
                          </h3>
                          {content.description && (
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                              {content.description}
                            </p>
                          )}
                          
                          {/* Tags */}
                          {content.tags && content.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {content.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Meta */}
                          <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                            <span>创建于 {formatDate(content.createdAt)}</span>
                            <span>浏览 {content.viewCount}</span>
                            <span>点赞 {content.likeCount}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handlePublish(content.id, content.published)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                            title={content.published ? '设为草稿' : '发布'}
                          >
                            {content.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => handleFeature(content.id, content.featured)}
                            className="p-2 text-gray-400 hover:text-yellow-500"
                            title={content.featured ? '取消精选' : '设为精选'}
                          >
                            {content.featured ? <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> : <StarOff className="h-4 w-4" />}
                          </button>
                          <Link
                            href={`/admin/contents/${content.id}/edit`}
                            className="p-2 text-gray-400 hover:text-indigo-600"
                            title="编辑"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(content.id)}
                            className="p-2 text-gray-400 hover:text-red-600"
                            title="删除"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="mt-3 flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          content.published 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {content.published ? '已发布' : '草稿'}
                        </span>
                        {content.featured && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                            精选
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500">暂无内容</p>
              <Link
                href="/admin/contents/new"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                创建第一个内容
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ContentManager };