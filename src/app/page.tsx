import { contentManager, categoryManager } from "@/storage/database";
import { RefinedCard } from "@/components/home/RefinedCard";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch data for homepage
  const contents = await contentManager.getContents({
    limit: 20,
    includeUnpublished: false,
    orderBy: 'createdAt',
    orderDirection: 'desc',
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
    <div className="min-h-screen">
      {/* 1. 优雅的导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tight text-zinc-900">CONTENT HUB</h1>
          <div className="h-8 w-8 rounded-full bg-zinc-200" /> {/* 占位头像 */}
        </div>
      </nav>

      {/* 2. 内容主体 */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 瀑布流容器 */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {/* 这里是你从后端获取的数据 Map */}
          {contentsWithCategory.map((item) => (
            <RefinedCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              category={item.category}
              createdAt={item.createdAt}
            />
          ))}
        </div>

        {/* 空状态 */}
        {contentsWithCategory.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-lg">暂无内容</p>
          </div>
        )}
      </main>
    </div>
  );
}