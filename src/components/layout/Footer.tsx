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
    { href: '/category/tools', label: '好工具' },
    { href: '/category/articles', label: '好文章' },
    { href: '/category/design', label: '设计灵感' },
    { href: '/category/resources', label: '学习资源' },
  ];

  const socialLinks = [
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Github, label: 'GitHub' },
  ];

  return (
    <footer className="mt-20 border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-[#1D1D1F] leading-tight">见地</span>
                <span className="text-[10px] font-medium text-[#86868B] tracking-[0.2em]">IN SIGHT</span>
              </div>
            </div>
            <p className="text-sm text-[#86868B] leading-relaxed max-w-sm mb-8">
              私人灵感策展空间，每一条存入的灵感都是一件被精心摆放的艺术品。
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-[#86868B] transition-all hover:bg-[#1D1D1F] hover:text-white hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#1D1D1F] mb-6">快速访问</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#86868B] transition-colors hover:text-[#007AFF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-[#1D1D1F] mb-6">热门分类</h3>
            <ul className="space-y-4">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#86868B] transition-colors hover:text-[#007AFF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-zinc-100">
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-sm text-[#86868B]">
              © {currentYear} 见地 IN SIGHT. All rights reserved.
            </p>
            <p className="flex items-center text-xs text-[#86868B]">
              Made with <Heart className="mx-1.5 h-3.5 w-3.5 text-[#FE2C55]" /> for content lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
