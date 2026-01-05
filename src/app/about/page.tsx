import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-[#E8E2DA]">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-[#9A9A9A] hover:text-[#E86A5A] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">返回客厅</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[black]">关于我们</h1>
              <p className="text-[#9A9A9A] text-sm mt-1">了解见地的故事</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="bg-white rounded-3xl p-12" style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)' }}>
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-[#E8E2DA] marble-texture flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-[black]" />
            </div>
            <h2 className="text-3xl font-bold text-[black] mb-4">见地 IN SIGHT</h2>
            <p className="text-lg text-[#6B6B6B]">私人灵感策展空间</p>
          </div>

          <div className="space-y-8 text-[#6B6B6B] leading-relaxed">
            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">我们的愿景</h3>
              <p>
                见地是一个专注于灵感收藏与分享的平台。我们相信，每一条优质的灵感都是一件艺术品，
                值得被精心摆放和珍藏。在这里，你可以收藏来自各个渠道的优质内容，
                按照自己的方式分类整理，打造属于你的私人灵感画廊。
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">核心理念</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#E86A5A] mt-1">•</span>
                  <div>
                    <strong className="text-[black]">精选而非海量</strong>
                    <p className="mt-1">我们相信质量胜于数量，每一份灵感都值得被认真对待。</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E86A5A] mt-1">•</span>
                  <div>
                    <strong className="text-[black]">艺术策展美学</strong>
                    <p className="mt-1">以杂志质感的设计语言，让灵感收藏成为一种享受。</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E86A5A] mt-1">•</span>
                  <div>
                    <strong className="text-[black]">私密与开放并重</strong>
                    <p className="mt-1">你可以打造私人收藏空间，也可以分享给更多人发现灵感。</p>
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">联系我们</h3>
              <p>
                如果你有任何问题或建议，欢迎随时与我们联系。
                我们会认真对待每一条反馈。
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#E8E2DA] text-center">
            <p className="text-sm text-[#9A9A9A]">
              Made with <Heart className="inline h-3.5 w-3.5 text-[#E86A5A]" /> for content lovers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
