import Link from 'next/link';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/about', label: '关于' },
    { href: '/privacy', label: '隐私政策' },
    { href: '/terms', label: '服务条款' },
    { href: '/contact', label: '联系我们' },
  ];

  const socialLinks = [
    { href: '#', icon: Github, label: 'GitHub' },
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: 'mailto:contact@example.com', icon: Mail, label: 'Email' },
  ];

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"></div>
              <span className="text-xl font-bold text-gray-900">内容收藏站</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-gray-600">
              一个专注于收藏和分享优质内容的个人网站。发现好工具、好文章、好设计，让每一个发现都值得被记录。
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-gray-600"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">快速链接</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">热门分类</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/category/tools" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
                  好工具
                </Link>
              </li>
              <li>
                <Link href="/category/articles" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
                  好文章
                </Link>
              </li>
              <li>
                <Link href="/category/design" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
                  设计灵感
                </Link>
              </li>
              <li>
                <Link href="/category/resources" className="text-sm text-gray-600 transition-colors hover:text-gray-900">
                  学习资源
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row">
            <p className="text-sm text-gray-600">
              © {currentYear} 内容收藏站. 保留所有权利.
            </p>
            <p className="flex items-center text-sm text-gray-600">
              Made with <Heart className="mx-1 h-4 w-4 text-red-500" /> for content lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };