import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
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
              <h1 className="text-2xl font-bold text-[black]">使用条款</h1>
              <p className="text-[#9A9A9A] text-sm mt-1">使用见地的规则和规范</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="bg-white rounded-3xl p-12" style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)' }}>
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-[#E8E2DA] marble-texture flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-[black]" />
            </div>
            <h2 className="text-3xl font-bold text-[black]">使用条款</h2>
            <p className="text-[#6B6B6B] mt-2">最后更新：2024年1月</p>
          </div>

          <div className="space-y-8 text-[#6B6B6B] leading-relaxed">
            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">1. 服务说明</h3>
              <p>
                见地是一个灵感收藏和分享平台，允许用户收集、整理和分享各类内容。
                我们致力于提供优质的服务，但不保证服务的不间断、及时或无错误。
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">2. 用户责任</h3>
              <p>使用见地服务时，你需要：</p>
              <ul className="space-y-2 list-disc list-inside mt-3">
                <li>提供真实、准确的信息</li>
                <li>遵守所有适用的法律法规</li>
                <li>尊重他人的知识产权和隐私</li>
                <li>不发布违法、有害、侵权的内容</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">3. 内容规范</h3>
              <p>禁止上传或分享以下内容：</p>
              <ul className="space-y-2 list-disc list-inside mt-3">
                <li>违法、暴力、色情或仇恨言论</li>
                <li>侵犯他人版权、商标或其他知识产权</li>
                <li>欺诈、诈骗或虚假信息</li>
                <li>恶意软件或病毒</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">4. 知识产权</h3>
              <p>
                见地平台的设计、代码和商标归我们所有。用户上传的内容版权归用户所有。
                通过上传内容，你授予我们在平台内展示和分发的许可。
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">5. 服务变更</h3>
              <p>
                我们保留随时修改、暂停或终止服务的权利，恕不另行通知。
                我们也可能更新本使用条款，请定期查看最新版本。
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">6. 免责声明</h3>
              <p>
                在法律允许的最大范围内，我们不对因使用或无法使用服务而造成的
                直接或间接损失承担责任。
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[black] mb-4">7. 争议解决</h3>
              <p>
                因使用本服务而产生的任何争议，应首先通过友好协商解决。
                协商不成的，可向有管辖权的法院提起诉讼。
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#E8E2DA]">
            <p className="text-sm text-[#9A9A9A] text-center">
              使用见地即表示你同意本使用条款。如有疑问，请联系我们。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
