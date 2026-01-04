'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { ContentGridClient } from '@/components/home/ContentGridClient';
import { useParams } from 'next/navigation';

export default function ExplorePage() {
  const params = useParams();
  const currentTag = params.tag as string;

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">返回客厅</span>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#1D1D1F]">
                {currentTag ? `#${currentTag}` : '探索灵感'}
              </h1>
              <p className="text-[#86868B] text-sm mt-1">
                {currentTag ? `浏览所有"${currentTag}"相关的内容` : '发现更多有趣的内容'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                <input
                  type="text"
                  placeholder="搜索灵感..."
                  className="pl-11 pr-4 py-2.5 bg-zinc-100 rounded-full text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#007AFF] w-64 placeholder:text-zinc-300 transition-all"
                />
              </div>
              <button className="p-2.5 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
                <Filter className="w-5 h-5 text-[#86868B]" />
              </button>
            </div>
          </div>

          {/* Tags */}
          {!currentTag && (
            <div className="mt-6 flex flex-wrap gap-2">
              {['全部', '设计灵感', '生活美学', '艺术策展', '好书推荐', '音乐精选', '摄影作品', '旅行记录'].map((tag) => (
                <Link
                  key={tag}
                  href={tag === '全部' ? '/explore' : `/explore?tag=${encodeURIComponent(tag)}`}
                  className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:shadow-md"
                  style={{
                    backgroundColor: tag === '全部' ? '#1D1D1F' : '#F5F5F7',
                    color: tag === '全部' ? '#FFFFFF' : '#86868B',
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-[1800px] mx-auto px-8 py-8">
        <ContentGridClient />
      </div>
    </div>
  );
}
