import Link from 'next/link';
import { Github, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/about', label: '关于我们' },
    { href: '/privacy', label: '隐私政策' },
    { href: '/terms', label: '使用条款' },
  ];

  const categoryLinks = [
    { href: '/explore?tag=好工具', label: '好工具' },
    { href: '/explore?tag=好文章', label: '好文章' },
    { href: '/explore?tag=设计灵感', label: '设计灵感' },
    { href: '/explore?tag=学习资源', label: '学习资源' },
  ];

  const socialLinks = [
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Github, label: 'GitHub' },
  ];

  return (
    <footer className="mt-20 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-9 h-9 rounded-full bg-[#E8E2DA] marble-texture flex items-center justify-center">
                <Heart className="w-5 h-5 text-[black]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-[#E86A5A] leading-tight">见地</span>
                <span className="text-[10px] font-medium text-[#9A9A9A] tracking-[0.2em]">IN SIGHT</span>
              </div>
            </div>
            <p className="text-sm text-[#9A9A9A] leading-relaxed max-w-sm mb-8">
              私人灵感策展空间，每一条存入的灵感都是一件被精心摆放的艺术品。
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#9A9A9A] transition-all hover:bg-[#E8E2DA] hover:text-[black] hover:scale-110 hover:marble-texture"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[black] mb-6">快速访问</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9A9A9A] transition-colors hover:text-[black]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-[black] mb-6">热门分类</h3>
            <ul className="space-y-4">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9A9A9A] transition-colors hover:text-[black]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-[#E8E2DA]">
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-sm text-[#9A9A9A]">
              © {currentYear} 见地 IN SIGHT. All rights reserved.
            </p>
            <p className="flex items-center text-xs text-[#9A9A9A]">
              Made with <Heart className="mx-1.5 h-3.5 w-3.5 text-[#E8E2DA]" /> for content lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
