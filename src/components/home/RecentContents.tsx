import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { ExternalLink, Eye, Heart } from 'lucide-react';
import { Content } from '@/types';

interface RecentContentsProps {
  contents: Content[];
}

export const RecentContents = ({ contents }: RecentContentsProps) => {
  if (contents.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              最新内容
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              发现最近收藏的优质内容
            </p>
          </div>
          <Link
            href="/recent"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
          >
            查看全部
          </Link>
        </div>

        {/* Contents Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contents.map((content) => (
            <article
              key={content.id}
              className="group relative rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-gray-300 hover:shadow-lg"
            >
              {/* Content Image */}
              {content.imageUrl ? (
                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                  <Image
                    src={content.imageUrl}
                    alt={content.title}
                    width={300}
                    height={169}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200"></div>
              )}

              {/* Content Info */}
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  <Link href={`/content/${content.id}`}>
                    {content.title}
                  </Link>
                </h3>
                
                {content.description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {content.description}
                  </p>
                )}

                {/* Tags */}
                {content.tags && content.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {content.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Meta */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {content.viewCount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {content.likeCount}
                    </div>
                  </div>
                  <time>{formatDate(content.createdAt)}</time>
                </div>

                {/* Source Link */}
                {content.sourceUrl && (
                  <div className="mt-3">
                    <a
                      href={content.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700"
                    >
                      原文链接
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};