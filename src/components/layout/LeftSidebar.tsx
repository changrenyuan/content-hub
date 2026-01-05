'use client';

import Link from 'next/link';
import { Home, Search, BookOpen, Heart, User, Settings, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { icon: Home, label: '客厅', href: '/' },
  { icon: Search, label: '漫游', href: '/explore' },
  { icon: BookOpen, label: '收藏室', href: '/categories' },
  { icon: Heart, label: '心动', href: '/favorites' },
  { icon: User, label: '个人空间', href: '/profile' },
];

export function LeftSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 悬浮三道杠按钮 - 固定在左下角 */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed left-4 bottom-24 z-50 w-12 h-12 rounded-full
          bg-white shadow-lg hover:shadow-xl transition-all duration-300
          flex items-center justify-center hover:scale-105
          ${isOpen ? 'opacity-0 pointer-events-none' : ''}
        `}
        style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)' }}
      >
        <Menu className="w-5 h-5 text-[black]" />
      </button>

      {/* 导航栏 - 悬浮展开 */}
      <aside
        className={`
          fixed left-0 top-0 h-full z-40
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'}
          bg-[#FFFFFF] shadow-2xl
        `}
      >
        <div className="h-full p-8 space-y-16 overflow-y-auto">
          {/* Header - Logo and Close Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#F7F7F7] marble-texture" />
              <div>
                <h1 className="text-2xl font-black tracking-tight text-[#E86A5A]">见地</h1>
                <span className="text-xs font-medium text-[#9A9A9A] tracking-[0.2em]">IN SIGHT</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors text-[#9A9A9A] hover:text-[black]"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300
                        ${isActive
                          ? 'bg-[#F7F7F7] text-[black] shadow-sm marble-texture'
                          : 'text-[#9A9A9A] hover:bg-white hover:text-[black]'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[black]' : ''}`} />
                      <span className="font-medium tracking-wide">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Quick Actions */}
          <div>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="
                block w-full bg-[#F7F7F7] marble-texture text-[black] px-6 py-4 rounded-2xl font-semibold
                hover:bg-[black] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5
                text-center
              "
            >
              收藏灵感
            </Link>
          </div>

          {/* Settings */}
          <div className="pt-8">
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-[#9A9A9A] hover:text-[black] transition-colors duration-300 px-4 py-2 rounded-xl hover:bg-white"
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">设置</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* 遮罩层 */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity"
        />
      )}
    </>
  );
}
