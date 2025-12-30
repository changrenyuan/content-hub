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
      <div className="sticky top-24 space-y-12">
        {/* Logo - Minimal and Elegant */}
        <div className="px-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-600 shadow-soft" />
            <div>
              <h1 className="text-2xl font-black tracking-tight text-zinc-900">见地</h1>
              <span className="text-xs font-medium text-zinc-400 tracking-widest">IN SIGHT</span>
            </div>
          </div>
        </div>

        {/* Navigation - Minimal and Airy */}
        <nav className="px-4">
          <ul className="space-y-2">
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
                        ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-200/50'
                        : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 hover:shadow-sm'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
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
            w-full bg-zinc-900 text-white px-6 py-4 rounded-2xl font-semibold
            hover:bg-zinc-800 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/30 hover:-translate-y-0.5
          ">
            收藏灵感
          </button>
        </div>

        {/* Settings - Minimal */}
        <div className="px-6 pt-8">
          <Link
            href="/settings"
            className="flex items-center gap-3 text-zinc-400 hover:text-zinc-600 transition-colors duration-300 hover:shadow-sm hover:shadow-zinc-100/50 px-4 py-2 rounded-xl"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">设置</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
