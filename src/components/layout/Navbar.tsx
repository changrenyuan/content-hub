'use client';

import Link from 'next/link';
import { Search, Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { href: '/', label: '发现' },
    { href: '/categories', label: '分类' },
    { href: '/featured', label: '精选' },
    { href: '/popular', label: '热门' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F7F7]" style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)' }}>
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-9 h-9 rounded-full bg-[#F7F7F7] marble-texture flex items-center justify-center transition-transform group-hover:scale-105">
            <Heart className="w-5 h-5 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-[#E86A5A] leading-tight">见地</span>
            <span className="text-[10px] font-medium text-[#9A9A9A] tracking-[0.2em] hidden sm:inline">IN SIGHT</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-5 py-2 text-sm font-medium text-[#9A9A9A] transition-colors hover:text-[black] hover:bg-[var(--bg-hover)] rounded-full"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A9A9A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="寻觅灵感..."
                className="w-72 rounded-full py-2.5 pl-11 pr-5 text-sm text-[black] placeholder:text-[#9A9A9A] transition-all focus:outline-none focus:ring-2 focus:ring-[#F7F7F7] hover:bg-[#F7F7F7]"
              />
            </div>
          </form>

          {/* Collect Button */}
          <Link
            href="/admin"
            className="hidden md:block px-5 py-2.5 bg-[#F7F7F7] marble-texture text-[black] rounded-full text-sm font-medium hover:bg-[black] hover:text-white transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            收藏灵感
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden rounded-full p-2 text-[#9A9A9A] transition-colors hover:bg-[var(--bg-hover)]"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[#F7F7F7] bg-[#F7F7F7]">
          <div className="px-6 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A9A9A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="寻觅灵感..."
                  className="w-full rounded-full py-2.5 pl-11 pr-5 text-sm text-[black] placeholder:text-[#9A9A9A] focus:outline-none"
                />
              </div>
            </form>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-[#9A9A9A] transition-colors hover:bg-[var(--bg-hover)] hover:text-[black] rounded-2xl"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[#F7F7F7]">
              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full px-5 py-3 bg-[#F7F7F7] marble-texture text-[black] rounded-full text-base font-medium hover:bg-[black] hover:text-white"
              >
                收藏灵感
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export { Navbar };
