'use client';

import { useEffect, useState } from 'react';
import { MagazineCard } from './MagazineCard';

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
}

export function ContentGridClient() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContents() {
      try {
        const response = await fetch('/api/contents');
        if (!response.ok) {
          throw new Error('Failed to fetch contents');
        }
        const data = await response.json();
        // Enhance with category data
        const enhancedData = await Promise.all(
          data.map(async (item: any) => {
            const categoryResponse = await fetch(`/api/categories/${item.categoryId}`);
            if (categoryResponse.ok) {
              const category = await categoryResponse.json();
              return { ...item, category };
            }
            return item;
          })
        );
        setContents(enhancedData);
      } catch (err) {
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
          <div key={i} className="bg-white rounded-3xl overflow-hidden">
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
        <p className="text-zinc-500 mb-4 font-medium">灵感暂时离线了</p>
        <p className="text-zinc-400 text-sm">稍后再来探访吧</p>
      </div>
    );
  }

  if (contents.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-400 text-lg">空间还空着</p>
        <p className="text-zinc-300 text-sm mt-2">收藏第一条灵感，让它入座</p>
      </div>
    );
  }

  return (
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
        />
      ))}
    </div>
  );
}
