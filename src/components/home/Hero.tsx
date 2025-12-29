import Link from 'next/link';
import { ArrowRight, Bookmark, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 sm:py-24">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 mb-8">
            <Sparkles className="h-4 w-4" />
            发现优质内容，记录精彩瞬间
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            <span className="block">收藏</span>
            <span className="block text-indigo-600">优质内容</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
            一个专注于收藏和分享优质内容的个人平台。在这里发现好工具、好文章、好设计，
            让每一个精彩的内容都值得被记录和分享。
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/categories"
              className="group relative inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              开始探索
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/featured"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Bookmark className="h-4 w-4" />
              精选内容
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-gray-200 pt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">1000+</div>
              <div className="mt-1 text-sm text-gray-600">收藏内容</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">20+</div>
              <div className="mt-1 text-sm text-gray-600">精选分类</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="mt-1 text-sm text-gray-600">活跃用户</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };