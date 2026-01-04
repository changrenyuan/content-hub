'use client';

import Link from 'next/link';
import { Home, Search, BookOpen, Heart, User, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: Home, label: '客厅', href: '/' },
  { icon: Search, label: '漫游', href: '/explore' },
  { icon: BookOpen, label: '收藏室', href: '/categories' },
  { icon: Heart, label: '心动', href: '/favorites' },
  { icon: User, label: '个人空间', href: '/profile' },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-16">
        {/* Logo - Minimal and Elegant */}
        <div className="px-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#EDE6DC]" />
            <div>
              <h1 className="text-2xl font-black tracking-tight" style={{ backgroundImage: 'linear-gradient(135deg, #E86A5A, #F2C94C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>见地</h1>
              <span className="text-xs font-medium text-[#9A9A9A] tracking-[0.2em]">IN SIGHT</span>
            </div>
          </div>
        </div>

        {/* Navigation - Minimal and Airy */}
        <nav className="px-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300
                      ${isActive
                        ? 'bg-[#EDE6DC] text-[#2F2F2F] shadow-sm'
                        : 'text-[#9A9A9A] hover:bg-white hover:text-[#2F2F2F]'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#2F2F2F]' : ''}`} />
                    <span className="font-medium tracking-wide">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Actions - Elegant Button */}
        <div className="px-6">
          <button className="
            w-full bg-[#EDE6DC] text-[#2F2F2F] px-6 py-4 rounded-2xl font-semibold
            hover:bg-[#2F2F2F] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5
          ">
            收藏灵感
          </button>
        </div>

        {/* Settings - Minimal */}
        <div className="px-6 pt-8">
          <Link
            href="/settings"
            className="flex items-center gap-3 text-[#9A9A9A] hover:text-[#2F2F2F] transition-colors duration-300 px-4 py-2 rounded-xl hover:bg-white"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">设置</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
