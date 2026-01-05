import Link from 'next/link';
import { ArrowLeft, FolderKanban } from 'lucide-react';
import { categoryManager } from '@/storage/database';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await categoryManager.getCategories();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-[#F7F7F7]">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-[#9A9A9A] hover:text-[#E86A5A] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">返回客厅</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[black]">收藏室</h1>
              <p className="text-[#9A9A9A] text-sm mt-1">浏览所有分类的内容</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        {categories.length === 0 ? (
          <div className="text-center py-20">
            <FolderKanban className="w-16 h-16 text-[#9A9A9A] mx-auto mb-4" />
            <p className="text-[black] text-lg mb-2">收藏室还空着</p>
            <p className="text-[#9A9A9A]">还没有分类，快去创建一些吧</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/explore?category=${category.id}`}
                className="bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
                style={{
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                  border: `2px solid ${category.color ?? 'black'}20`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${category.color ?? '#1D1D1F'}20`, color: category.color ?? '#1D1D1F' }}
                >
                  <FolderKanban className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-[black] mb-2">{category.name}</h2>
                <p className="text-[#6B6B6B] text-sm">{category.description || '暂无描述'}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
