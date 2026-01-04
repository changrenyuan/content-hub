'use client';

import { useEffect, useState } from 'react';
import { MagazineCard } from './MagazineCard';
import { ContentDetailModal } from './ContentDetailModal';

interface Content {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: Date;
  viewCount: number;
  likeCount: number;
  category?: {
    name: string;
  } | null;
  author?: string | null;
  authorAvatar?: string | null;
}

export function ContentGridClient() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContents() {
      try {
        console.log('[ContentGridClient] 开始获取内容...');
        const response = await fetch('/api/contents');
        console.log('[ContentGridClient] API 响应状态:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('[ContentGridClient] API 错误:', errorData);
          throw new Error('Failed to fetch contents');
        }

        const data = await response.json();
        console.log('[ContentGridClient] 获取到的内容数量:', data.length);
        console.log('[ContentGridClient] 内容数据:', data);

        // 直接使用 API 返回的数据，不再逐个请求分类信息
        // 这样可以避免 N+1 查询问题和可能的网络失败
        setContents(data);
      } catch (err) {
        console.error('[ContentGridClient] 获取内容失败:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchContents();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)' }}>
            <div className="aspect-[4/5] bg-zinc-100 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-zinc-200 rounded animate-pulse" />
              <div className="h-4 bg-zinc-100 rounded animate-pulse" />
              <div className="h-4 bg-zinc-100 rounded w-2/3 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-[#86868B] mb-4 font-medium">灵感暂时离线了</p>
        <p className="text-[#86868B] text-sm">稍后再来探访吧</p>
      </div>
    );
  }

  if (contents.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[#86868B] text-lg">空间还空着</p>
        <p className="text-[#86868B] text-sm mt-2">收藏第一条灵感，让它入座</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((item) => (
          <MagazineCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            category={item.category}
            viewCount={item.viewCount}
            likeCount={item.likeCount}
            createdAt={item.createdAt}
            author={item.author}
            authorAvatar={item.authorAvatar}
            onClick={() => setSelectedContentId(item.id)}
          />
        ))}
      </div>

      <ContentDetailModal
        contentId={selectedContentId || ''}
        isOpen={!!selectedContentId}
        onClose={() => setSelectedContentId(null)}
      />
    </>
  );
}
