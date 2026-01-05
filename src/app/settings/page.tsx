import Link from 'next/link';
import { ArrowLeft, Settings, Moon, Sun, Globe, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-[#E8E2DA]">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-[#9A9A9A] hover:text-[#E86A5A] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">返回客厅</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[black]">设置</h1>
              <p className="text-[#9A9A9A] text-sm mt-1">个性化你的体验</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="max-w-[800px] mx-auto px-8 py-12">
        <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)' }}>
          {/* Appearance */}
          <div className="p-6 border-b border-[#E8E2DA]">
            <div className="flex items-center gap-3 mb-4">
              <Sun className="w-5 h-5 text-[#9A9A9A]" />
              <h2 className="font-semibold text-[black]">外观</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-[black] font-medium">深色模式</div>
                  <div className="text-[#9A9A9A] text-sm">切换深色主题</div>
                </div>
                <button className="w-12 h-6 rounded-full relative transition-colors">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-[black] font-medium">语言</div>
                  <div className="text-[#9A9A9A] text-sm">选择界面语言</div>
                </div>
                <select className="px-4 py-2 rounded-lg text-sm text-[black] focus:outline-none focus:ring-2 focus:ring-[#E86A5A]">
                  <option>简体中文</option>
                  <option>English</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="p-6 border-b border-[#E8E2DA]">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-[#9A9A9A]" />
              <h2 className="font-semibold text-[black]">通知</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-[black] font-medium">邮件通知</div>
                  <div className="text-[#9A9A9A] text-sm">接收灵感知音邮件</div>
                </div>
                <button className="w-12 h-6 bg-[#E86A5A] rounded-full relative transition-colors">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-[black] font-medium">评论提醒</div>
                  <div className="text-[#9A9A9A] text-sm">有人评论时通知</div>
                </div>
                <button className="w-12 h-6 bg-[#E86A5A] rounded-full relative transition-colors">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#9A9A9A]" />
              <h2 className="font-semibold text-[black]">隐私</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-[black] font-medium">公开资料</div>
                  <div className="text-[#9A9A9A] text-sm">其他人可以查看你的资料</div>
                </div>
                <button className="w-12 h-6 rounded-full relative transition-colors">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
