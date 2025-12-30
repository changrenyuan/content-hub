'use client';

import Link from 'next/link';
import { Heart, Eye, BookMarked } from 'lucide-react';
import { useState } from 'react';

interface MagazineCardProps {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  category?: {
    name: string;
  } | null;
  viewCount: number;
  likeCount: number;
  createdAt: Date;
}

export function MagazineCard({
  id,
  title,
  description,
  imageUrl,
  category,
  viewCount,
  likeCount,
  createdAt,
}: MagazineCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formattedDate = typeof createdAt === 'string'
    ? new Date(createdAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
    : createdAt.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });

  // Generate artistic gradient based on content hash
  const generateGradient = (id: string) => {
    const gradients = [
      'from-zinc-100 to-zinc-200',
      'from-rose-50 to-pink-100',
      'from-blue-50 to-indigo-100',
      'from-amber-50 to-orange-100',
      'from-emerald-50 to-teal-100',
      'from-violet-50 to-purple-100',
      'from-cyan-50 to-sky-100',
      'from-fuchsia-50 to-pink-100',
    ];
    const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
    return gradients[index];
  };

  const gradientClass = !imageUrl ? generateGradient(id) : '';

  return (
    <Link href={`/content/${id}`}>
      <article className="group bg-white rounded-3xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-zinc-200/40 hover:-translate-y-1.5">
        {/* Image Section - Picture First */}
        <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${gradientClass}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-20">{title.charAt(0)}</span>
            </div>
          )}

          {/* Soft Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Tag - Soft and Minimal */}
          {category && (
            <div className="absolute top-5 left-5">
              <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-zinc-900 shadow-soft hover:shadow-md transition-shadow">
                {category.name}
              </span>
            </div>
          )}

          {/* Bookmark Button - Warm Interaction */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsBookmarked(!isBookmarked);
            }}
            title={isBookmarked ? "已入座" : "收藏入座"}
            className={`
              absolute top-5 right-5 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center
              transition-all duration-300 hover:scale-110
              ${isBookmarked ? 'shadow-lg shadow-zinc-200' : 'shadow-soft'}
            `}
          >
            <BookMarked
              className={`w-4.5 h-4.5 transition-all duration-300 ${isBookmarked ? 'fill-zinc-900 text-zinc-900 scale-110' : 'text-zinc-400'}`}
            />
          </button>
        </div>

        {/* Content Section - High Whitespace */}
        <div className="p-7 space-y-5">
          {/* Title - Elegant Typography */}
          <h2 className="text-lg font-bold leading-snug text-zinc-900 line-clamp-2 group-hover:text-zinc-700 transition-colors duration-300">
            {title}
          </h2>

          {/* Description - Subtle and Minimal */}
          {description && (
            <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Footer - Minimal and Elegant */}
          <div className="flex items-center justify-between pt-4">
            {/* Date - Minimal */}
            <span className="text-xs text-zinc-300 font-medium">
              {formattedDate}
            </span>

            {/* Stats - Warm and Subtle */}
            <div className="flex items-center gap-5 text-xs text-zinc-400">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
                title={isLiked ? "心动已记下" : "心动"}
                className="flex items-center gap-1.5 hover:text-red-500 transition-colors duration-300 group/btn"
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'group-hover/btn:scale-110'}`}
                />
                <span className="transition-opacity duration-300">{likeCount + (isLiked ? 1 : 0)}</span>
              </button>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Eye className="w-4 h-4" />
                <span>{viewCount}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
