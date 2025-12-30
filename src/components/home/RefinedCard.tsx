import Link from 'next/link';
import { Calendar, MoreHorizontal } from 'lucide-react';

interface RefinedCardProps {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  viewCount?: number;
  likeCount?: number;
  category?: {
    name: string;
    slug: string;
  } | null;
  createdAt: Date | string;
  source?: string;
}

export function RefinedCard({
  id,
  title,
  description,
  imageUrl,
  category,
  createdAt,
  source = 'RSS',
}: RefinedCardProps) {
  const formattedDate = typeof createdAt === 'string'
    ? new Date(createdAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
    : createdAt.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });

  const imageSrc = imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop';

  return (
    <div className="break-inside-avoid mb-6">
      <Link href={`/content/${id}`}>
        <div className="bg-white rounded-2xl border border-zinc-200/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1 cursor-pointer group">
          {/* 图片区域 - 模拟小红书 */}
          {imageSrc && (
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* 文字区域 - 模拟少数派排版 */}
          <div className="p-4">
            {/* 分类标签 */}
            <div className="flex items-center gap-2 mb-2">
              {category && (
                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                  {category.name}
                </span>
              )}
              {source && (
                <span className="text-[10px] font-medium text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">
                  {source}
                </span>
              )}
            </div>

            {/* 标题 */}
            <h2 className="text-base font-bold leading-snug text-zinc-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h2>

            {/* 描述 */}
            {description && (
              <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}

            {/* 底部信息 */}
            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
              <button
                className="text-zinc-400 hover:text-zinc-600 transition-colors p-1 rounded-full hover:bg-zinc-100"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: 实现收藏/更多功能
                }}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
