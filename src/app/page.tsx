import { BeautyContentGrid } from "@/components/home/BeautyContentGrid";
import { SeriousContentGrid } from "@/components/home/SeriousContentGrid";
import { RightSidebar } from "@/components/layout/RightSidebar";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 三栏内容分区布局 */}
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        <div className="flex gap-8">
          {/* 左：生活美学内容 - 1列瀑布流 */}
          <div className="w-[320px] flex-shrink-0">
            <BeautyContentGrid />
          </div>

          {/* 中：正经内容 - 3列瀑布流 */}
          <div className="flex-1 min-w-0">
            <SeriousContentGrid />
          </div>

          {/* 右：精选内容 - 保持不变 */}
          <div className="hidden xl:block w-[380px] flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
