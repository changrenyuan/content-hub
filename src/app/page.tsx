import { contentManager, categoryManager } from "@/storage/database";
import { NewHero } from "@/components/home/NewHero";
import { ContentGrid } from "@/components/home/ContentGrid";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { HotTags } from "@/components/home/HotTags";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch data for homepage
  const categories = await categoryManager.getCategories({ limit: 8 });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <NewHero />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - Left (3 columns) */}
        <div className="lg:col-span-3 space-y-8">
          <ContentGrid title="精选推荐" limit={12} />
        </div>

        {/* Sidebar - Right (1 column) */}
        <aside className="space-y-6">
          {/* Categories */}
          <CategoriesSection categories={categories} />

          {/* Hot Tags */}
          <HotTags />

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-4">数据统计</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">收录内容</span>
                <span className="font-bold text-lg">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">活跃分类</span>
                <span className="font-bold text-lg">{categories.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">用户收藏</span>
                <span className="font-bold text-lg">8.5K</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}