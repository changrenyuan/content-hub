import { Heart, MessageCircle, Tag, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ContentCardProps {
  content: {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    viewCount: number;
    likeCount: number;
    categoryId: string | null;
    category: {
      name: string;
      slug: string;
    } | null;
    createdAt: Date;
  };
}

export function ContentCard({ content }: ContentCardProps) {
  const imageUrl = content.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop';

  return (
    <Link href={`/content/${content.id}`}>
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={content.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Tag */}
          {content.category && (
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1.5 shadow-sm">
                <Tag className="w-3 h-3" />
                {content.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-base group-hover:text-blue-600 transition-colors">
            {content.title}
          </h3>

          {/* Description */}
          {content.description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {content.description}
            </p>
          )}

          {/* Footer Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" />
                <span>{content.likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>0</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{content.viewCount}</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
