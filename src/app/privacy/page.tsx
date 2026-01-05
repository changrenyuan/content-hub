import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
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
              <h1 className="text-2xl font-bold text-[black]">隐私政策</h1>
              <p className="text-[#9A9A9A] text-sm mt-1">我们如何保护你的数据</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="bg-white rounded-3xl p-12" style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)' }}>
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-[#E8E2DA] marble-texture flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-[black]" />
            </div>
            <h2 className="text-3xl font-bold text-[black]">隐私政策</h2>
            <p className="text-[#6B6B6B] mt-2">最后更新：2024年1月</p>
          </div>

          <div className="space-y-8 text-[#6B6B6B] leading-relaxed">
            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">1. 信息收集</h3>
              <p className="mb-3">我们可能收集以下信息：</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>你主动提供的信息（如评论、收藏内容）</li>
                <li>设备信息和日志信息（如IP地址、浏览器类型）</li>
                <li>Cookies和类似技术收集的信息</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">2. 信息使用</h3>
              <p>我们使用收集的信息用于：</p>
              <ul className="space-y-2 list-disc list-inside mt-3">
                <li>提供、维护和改进我们的服务</li>
                <li>响应用户请求和支持需求</li>
                <li>发送通知和更新（在获得同意后）</li>
                <li>检测和防止欺诈和滥用</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">3. 信息共享</h3>
              <p>我们不会向第三方出售你的个人信息。我们仅在以下情况下共享信息：</p>
              <ul className="space-y-2 list-disc list-inside mt-3">
                <li>获得你的明确同意</li>
                <li>履行法律义务或保护我们的权利</li>
                <li>与提供服务的第三方（如云存储服务）</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">4. 数据安全</h3>
              <p>
                我们采取适当的安全措施来保护你的信息免受未经授权的访问、
                使用或披露。这些措施包括加密、访问控制和定期安全审查。
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">5. 你的权利</h3>
              <p>你有权：</p>
              <ul className="space-y-2 list-disc list-inside mt-3">
                <li>访问和更正你的个人信息</li>
                <li>删除你的账户和相关数据</li>
                <li>选择退出某些数据收集活动</li>
                <li>对我们的数据处理活动提出异议</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">6. 联系我们</h3>
              <p>
                如果你对本隐私政策有任何问题或疑虑，请通过以下方式联系我们：
              </p>
              <p className="mt-3 text-[black]">contact@jianti.com</p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#E8E2DA]">
            <p className="text-sm text-[#9A9A9A] text-center">
              使用见地即表示你同意本隐私政策。我们会定期更新本政策，
              建议你定期查看最新版本。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
