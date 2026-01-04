import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function FavoritesPage() {
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
              <h1 className="text-2xl font-bold text-[#1D1D1F]">心动</h1>
              <p className="text-[#86868B] text-sm mt-1">你喜欢的所有内容</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-20">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-[#FE2C55]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-3">还没有心动的内容</h2>
          <p className="text-[#86868B] mb-8">去客厅逛逛，发现你喜欢的灵感吧</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1D1D1F] text-white rounded-full font-semibold hover:bg-black transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
          >
            去发现
          </Link>
        </div>
      </div>
    </div>
  );
}
