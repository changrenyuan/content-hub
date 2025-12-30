import { Sparkles, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

export function NewHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-8 md:p-12 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>发现 1000+ 优质工具与资源</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          高效工具收藏
          <br />
          <span className="text-blue-200">让工作更简单</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
          精选实用的生产力工具、设计灵感和开发资源，帮你提升效率，发现价值
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            开始探索
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
          >
            浏览分类
          </Link>
        </div>
      </div>

      {/* Search Bar Preview */}
      <div className="mt-8 relative">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-white/60" />
          <span className="text-white/60">搜索工具、资源或文章...</span>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 hidden md:block">
        <div className="text-sm font-medium mb-1">今日新增</div>
        <div className="text-2xl font-bold">12</div>
      </div>

      <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 hidden md:block">
        <div className="text-sm font-medium mb-1">用户收藏</div>
        <div className="text-2xl font-bold">8.5K</div>
      </div>
    </div>
  );
}
