import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Star, ExternalLink, Eye, Heart } from 'lucide-react';
import { Content } from '@/types';

interface FeaturedSectionProps {
  contents: Content[];
}

const FeaturedSection = ({ contents }: FeaturedSectionProps) => {
  if (contents.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              精选内容
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              发现最受欢迎和推荐的优质内容
            </p>
          </div>
          <Link
            href="/featured"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
          >
            查看全部
          </Link>
        </div>

        {/* Featured Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {contents.map((content) => (
            <article
              key={content.id}
              className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-lg"
            >
              {/* Featured Badge */}
              <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-xs font-medium text-white">
                <Star className="h-3 w-3" />
                精选
              </div>

              {/* Content Image */}
              {content.imageUrl && (
                <div className="mt-4 aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={content.imageUrl}
                    alt={content.title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Content Info */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  <Link href={`/content/${content.id}`}>
                    {content.title}
                  </Link>
                </h3>
                
                {content.description && (
                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {content.description}
                  </p>
                )}

                {/* Tags */}
                {content.tags && content.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {content.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {content.tags.length > 3 && (
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        +{content.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Meta */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {content.viewCount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {content.likeCount}
                    </div>
                  </div>
                  <time>{formatDate(content.createdAt)}</time>
                </div>

                {/* Source Link */}
                {content.sourceUrl && (
                  <div className="mt-4">
                    <a
                      href={content.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      查看原文
                      <ExternalLink className="h-3 w-3" />
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

export { FeaturedSection };