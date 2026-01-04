'use client';

import Link from 'next/link';
import { TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Content {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  viewCount: number;
  likeCount: number;
  createdAt: Date;
}

export function RightSidebar() {
  const [trending, setTrending] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const response = await fetch('/api/contents?limit=5&sort=popular');
        if (response.ok) {
          const data = await response.json();
          setTrending(data.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch trending:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  return (
    <aside className="w-72 flex-shrink-0">
      <div className="sticky top-24 space-y-8">
        {/* Trending Section - Magazine Quality */}
        <div className="bg-white rounded-3xl p-7" style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)' }}>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#2F2F2F]" />
            <h3 className="font-semibold text-[#2F2F2F] text-base">当下焦点</h3>
          </div>

          <div className="space-y-5">
            {loading ? (
              <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-3 bg-[#FAF7F2] rounded w-3/4 mb-2" />
                    <div className="h-2 bg-[#FAF7F2] rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              trending.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/content/${item.id}`}
                  className="group block"
                >
                  <div className="flex gap-3">
                    {/* Rank Number - Elegant Badge */}
                    <span className={`
                      flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold
                      ${index < 3
                        ? 'bg-[#EDE6DC] text-[#2F2F2F]'
                        : 'bg-[#FAF7F2] text-[#9A9A9A]'
                      }
                    `}>
                      {index + 1}
                    </span>

                    {/* Content - Airy Layout */}
                    <div className="flex-1 min-w-0">
                      <h4 className="
                        text-sm font-medium text-[#2F2F2F] mb-1.5 leading-snug
                        line-clamp-2 group-hover:text-[#2F2F2F] transition-colors duration-300
                      ">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-[#9A9A9A]">
                        <span className="group-hover:text-[#2F2F2F] transition-colors">❤️ {item.likeCount}</span>
                        <span>👁️ {item.viewCount}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Categories - Minimal Tags */}
        <div className="bg-white rounded-3xl p-7" style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)' }}>
          <h3 className="font-semibold text-[#2F2F2F] mb-6 text-base">灵感角落</h3>
          <div className="flex flex-wrap gap-2.5">
            {['设计灵感', '生活美学', '艺术策展', '好书推荐', '音乐精选'].map((tag) => (
              <Link
                key={tag}
                href={`/explore?tag=${encodeURIComponent(tag)}`}
                className="
                  px-4 py-2 bg-[#FAF7F2] text-[#9A9A9A] rounded-full text-sm font-medium
                  hover:bg-[#EDE6DC] hover:text-[#2F2F2F] transition-all duration-300
                "
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Daily Pick - Magazine Editorial Style */}
        <div className="bg-[#EDE6DC] rounded-3xl p-7">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-base text-[#2F2F2F]">今日推荐</h3>
            <Calendar className="w-4 h-4 text-[#9A9A9A]" />
          </div>
          <p className="text-sm text-[#6B6B6B] mb-5 leading-relaxed">
            为你挑选今日最有价值的灵感，点亮你的创造时光。
          </p>
          <Link
            href="/daily"
            className="
              inline-flex items-center gap-2 text-sm font-semibold text-[#2F2F2F]
              hover:text-[#2F2F2F]/80 transition-colors duration-300
            "
          >
            走进画廊
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Newsletter - Elegant Typography */}
        <div className="bg-white rounded-3xl p-7" style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)' }}>
          <h3 className="font-semibold text-[#2F2F2F] mb-3 text-base">灵感知音</h3>
          <p className="text-sm text-[#9A9A9A] mb-5 leading-relaxed">
            每周与你分享精选灵感，不错过任何美好事物
          </p>
          <input
            type="email"
            placeholder="留下你的邮箱"
            className="
              w-full px-5 py-3.5 bg-[#FAF7F2] rounded-xl text-sm text-[#2F2F2F]
              focus:outline-none focus:ring-2 focus:ring-[#E86A5A]
              placeholder:text-[#9A9A9A] transition-all duration-300
            "
          />
          <button className="
            w-full mt-4 bg-[#EDE6DC] text-[#2F2F2F] px-4 py-3.5 rounded-xl text-sm font-semibold
            hover:bg-[#2F2F2F] hover:text-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
          ">
            加入
          </button>
        </div>
      </div>
    </aside>
  );
}
