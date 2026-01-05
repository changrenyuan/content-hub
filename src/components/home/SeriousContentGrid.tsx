'use client';

import { useEffect, useState } from 'react';
import { MagazineCard } from './MagazineCard';
import { ContentDetailModal } from './ContentDetailModal';

type AspectRatio = '4/5' | '1/1' | '3/4';

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

// 随机宽高比分配函数
function assignAspectRatio(index: number): AspectRatio {
  const ratios: AspectRatio[] = ['4/5', '1/1', '3/4'];

  // 基础权重：4/5 (40%), 1/1 (30%), 3/4 (30%)
  const weights = [0.4, 0.3, 0.3];

  const random = Math.random();
  let cumulative = 0;

  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) {
      return ratios[i];
    }
  }

  return ratios[0];
}

// 为每个内容分配宽高比
function assignAspectRatios(contents: Content[]): Map<string, AspectRatio> {
  const ratioMap = new Map<string, AspectRatio>();

  contents.forEach((content, index) => {
    // 每 4-6 张卡片，刻意让一张不一样
    const specialInterval = 4 + Math.floor(Math.random() * 3); // 4-6
    if (index > 0 && (index + 1) % specialInterval === 0) {
      // 特殊卡片：选择一个"反常"的比例
      const specialRatios: AspectRatio[] = ['1/1', '3/4'];
      ratioMap.set(content.id, specialRatios[Math.floor(Math.random() * specialRatios.length)]);
    } else {
      // 普通卡片：使用常规分配逻辑
      ratioMap.set(content.id, assignAspectRatio(index));
    }
  });

  return ratioMap;
}

export function SeriousContentGrid() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [aspectRatioMap, setAspectRatioMap] = useState<Map<string, AspectRatio>>(new Map());

  useEffect(() => {
    async function fetchContents() {
      try {
        const response = await fetch('/api/contents?contentType=serious&limit=30');

        if (!response.ok) {
          throw new Error('Failed to fetch serious contents');
        }

        const data = await response.json();

        // 分配宽高比
        const ratios = assignAspectRatios(data);
        setAspectRatioMap(ratios);

        setContents(data);
      } catch (err) {
        console.error('Failed to fetch serious contents:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchContents();
  }, []);

  if (loading) {
    return (
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="bg-white rounded-3xl overflow-hidden break-inside-avoid" style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)' }}>
            <div className="aspect-[4/5] bg-[#F7F7F7] animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-[#F7F7F7] rounded animate-pulse" />
              <div className="h-4 bg-[#F7F7F7] rounded animate-pulse" />
              <div className="h-4 bg-[#F7F7F7] rounded w-2/3 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-[#9A9A9A] mb-4 font-medium">灵感暂时离线了</p>
        <p className="text-[#9A9A9A] text-sm">稍后再来探访吧</p>
      </div>
    );
  }

  if (contents.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[#9A9A9A] text-lg">空间还空着</p>
        <p className="text-[#9A9A9A] text-sm mt-2">收藏第一条灵感，让它入座</p>
      </div>
    );
  }

  return (
    <>
      {/* 三列瀑布流布局 */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
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
