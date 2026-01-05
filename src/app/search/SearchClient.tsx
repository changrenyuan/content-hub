'use client';

import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { ContentGridClient } from '@/components/home/ContentGridClient';
import { useState, useEffect } from 'react';

export function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-[#F7F7F7]">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A9A9A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索灵感..."
                  className="w-full rounded-full py-2.5 pl-11 pr-12 text-sm text-[black] placeholder:text-[#9A9A9A] transition-all focus:outline-none focus:ring-2 focus:ring-[#E86A5A]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[black]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {query ? (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-[black]">
                搜索结果："<span className="text-[#E86A5A]">{query}</span>"
              </h1>
              <p className="text-sm text-[#9A9A9A] mt-1">找到相关灵感</p>
            </div>
            <ContentGridClient />
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-[#F7F7F7] marble-texture flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-[#9A9A9A]" />
            </div>
            <h2 className="text-2xl font-bold text-[black] mb-3">寻觅灵感</h2>
            <p className="text-[#9A9A9A]">输入关键词，发现你感兴趣的内容</p>
          </div>
        )}
      </div>
    </div>
  );
}
