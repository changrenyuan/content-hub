import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';

export default function ProfilePage() {
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
              <h1 className="text-2xl font-bold text-[#1D1D1F]">个人空间</h1>
              <p className="text-[#86868B] text-sm mt-1">你的私人灵感角落</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-20">
        <div className="bg-white rounded-3xl p-12" style={{ boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)' }}>
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center mx-auto mb-6">
              <User className="w-16 h-16 text-[#86868B]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-3">访客</h2>
            <p className="text-[#86868B] mb-8">登录后解锁更多功能</p>
            <button className="px-8 py-3 bg-[#1D1D1F] text-white rounded-full font-semibold hover:bg-black transition-all hover:shadow-lg hover:-translate-y-0.5" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
              登录 / 注册
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
