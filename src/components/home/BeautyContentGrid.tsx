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

// 为美女内容分配竖向宽高比（更修长）
function assignAspectRatio(index: number): '4/5' | '1/1' | '3/4' {
  const ratios: ('4/5' | '1/1' | '3/4')[] = ['4/5', '3/4'];

  // 70% 竖向，30% 正方形
  const weights = [0.7, 0.3];

  const random = Math.random();
  let cumulative = 0;

  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) {
      return ratios[i] as '4/5' | '1/1' | '3/4';
    }
  }

  return ratios[0] as '4/5' | '1/1' | '3/4';
}

export function BeautyContentGrid() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [aspectRatioMap, setAspectRatioMap] = useState<Map<string, '4/5' | '1/1' | '3/4'>>(new Map());

  useEffect(() => {
    async function fetchContents() {
      try {
        const response = await fetch('/api/contents?contentType=beauty&limit=12');

        if (!response.ok) {
          throw new Error('Failed to fetch beauty contents');
        }

        const data = await response.json();

        // 分配宽高比
        const ratios = new Map<string, '4/5' | '1/1' | '3/4'>();
        data.forEach((content: Content, index: number) => {
          const ratio = assignAspectRatio(index);
          ratios.set(content.id, ratio);
        });
        setAspectRatioMap(ratios);

        setContents(data);
      } catch (err) {
        console.error('Failed to fetch beauty contents:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchContents();
  }, []);

  if (loading) {
    return (
      <div className="columns-1 gap-4 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-3xl overflow-hidden break-inside-avoid" style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)' }}>
            <div className="aspect-[4/5] bg-[#F7F7F7] animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-[#E8E2DA] rounded animate-pulse" />
              <div className="h-4 bg-[#F7F7F7] rounded w-3/4 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-[#9A9A9A] text-sm">生活美学内容加载中...</p>
      </div>
    );
  }

  if (contents.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-[#9A9A9A] text-sm">暂无生活美学内容</p>
      </div>
    );
  }

  return (
    <>
      {/* 单列瀑布流布局 */}
      <div className="columns-1 gap-4 space-y-4">
        {contents.map((item) => (
          <div key={item.id} className="break-inside-avoid">
            <MagazineCard
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
              aspectRatio={aspectRatioMap.get(item.id) || '4/5'}
              onClick={() => setSelectedContentId(item.id)}
            />
          </div>
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
