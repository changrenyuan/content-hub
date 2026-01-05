import Link from 'next/link';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { ContentGridClient } from '@/components/home/ContentGridClient';

export default function PopularPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-[#E8E2DA]">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-[#9A9A9A] hover:text-[#E86A5A] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">返回客厅</span>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-[#E86A5A]" />
                <h1 className="text-2xl font-bold text-[black]">热门灵感</h1>
              </div>
              <p className="text-[#9A9A9A] text-sm mt-1">最受大家喜欢的内容</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-[1800px] mx-auto px-8 py-8">
        <ContentGridClient />
      </div>
    </div>
  );
}
