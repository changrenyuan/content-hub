import Link from 'next/link';
import { Category } from '@/types';
import { LayoutGrid, ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  categories: Category[];
}

const categoryColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-cyan-500',
  'bg-rose-500',
  'bg-amber-500',
];

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  if (categories.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-gray-900">快速分类</h3>
        </div>
        <Link
          href="/categories"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          全部
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Categories Grid - 4 columns on desktop, 2 on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.slice(0, 8).map((category, index) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group"
          >
            <div
              className={`
                relative overflow-hidden rounded-xl p-4 transition-all duration-300
                hover:scale-105 hover:shadow-lg cursor-pointer
                ${categoryColors[index % categoryColors.length]}
              `}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              </div>

              {/* Category Content */}
              <div className="relative z-10">
                <div className="text-white/90 text-2xl mb-2">
                  {category.icon || '📦'}
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">
                  {category.name}
                </h4>
                {category.description && (
                  <p className="text-white/80 text-xs line-clamp-1">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export { CategoriesSection };