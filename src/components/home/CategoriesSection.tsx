import Link from 'next/link';
import { Category } from '@/types';

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  if (categories.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            内容分类
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            探索不同类型的优质内容
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              {/* Category Icon and Color */}
              <div className="mb-4">
                {category.icon ? (
                  <div 
                    className="flex h-12 w-12 items-center justify-center rounded-lg text-white text-2xl"
                    style={{ backgroundColor: category.color || '#6366f1' }}
                  >
                    {category.icon}
                  </div>
                ) : (
                  <div 
                    className="h-12 w-12 rounded-lg"
                    style={{ backgroundColor: category.color || '#6366f1' }}
                  />
                )}
              </div>

              {/* Category Name */}
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </h3>

              {/* Category Description */}
              {category.description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {category.description}
                </p>
              )}

              {/* Arrow Icon */}
              <div className="mt-4 text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
          >
            查看所有分类
          </Link>
        </div>
      </div>
    </section>
  );
};

export { CategoriesSection };