import Link from 'next/link';
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react';
import { ContentGridClient } from '@/components/home/ContentGridClient';

export default function DailyPage() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">返回客厅</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#1D1D1F]">今日推荐</h1>
              <p className="text-[#86868B] text-sm mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {dateStr}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-700 rounded-3xl p-12 text-white mb-12" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)' }}>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-3">今日精选</h2>
              <p className="text-zinc-200 text-lg leading-relaxed">
                为你挑选今日最有价值的灵感，点亮你的创造时光。每一条都是精心挑选的内容，希望能给你带来新的启发。
              </p>
            </div>
          </div>
        </div>

        {/* Daily Content */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#1D1D1F] mb-6">为你推荐</h3>
          <ContentGridClient />
        </div>
      </div>
    </div>
  );
}
