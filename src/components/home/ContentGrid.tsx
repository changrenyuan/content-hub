import { ContentCard } from './ContentCard';
import { contentManager } from '@/storage/database';

interface ContentGridProps {
  title?: string;
  limit?: number;
  showMore?: boolean;
}

export async function ContentGrid({ title = '发现好物', limit = 12, showMore = true }: ContentGridProps) {
  // Fetch contents with category information
  const contents = await contentManager.getContents({
    limit,
    includeUnpublished: false,
  });

  // Enhance contents with category data
  const contentsWithCategory = await Promise.all(
    contents.map(async (content) => {
      if (!content.categoryId) return { ...content, category: null };

      const enhanced = await contentManager.getContentByIdWithCategory(content.id);
      return {
        ...content,
        category: enhanced?.category || null,
      };
    })
  );

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-500 rounded-full" />
          {title}
        </h2>
        {showMore && (
          <a href="/explore" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            查看更多 →
          </a>
        )}
      </div>

      {/* Masonry Grid - 2 columns on desktop, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {contentsWithCategory.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>

      {/* Empty State */}
      {contentsWithCategory.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <p className="text-gray-500">暂无内容</p>
        </div>
      )}
    </section>
  );
}
