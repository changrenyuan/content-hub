import { ContentGridClient } from "@/components/home/ContentGridClient";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Three-Column Layout - Golden Ratio: 15% : 62% : 23% */}
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        <div className="flex gap-12">
          {/* Left Sidebar - Navigation (15%) */}
          <div className="hidden lg:block w-[280px] flex-shrink-0">
            <LeftSidebar />
          </div>

          {/* Center - Waterfall Content (62% - Golden Section) */}
          <div className="flex-1 min-w-0 max-w-[1100px]">
            <ContentGridClient />
          </div>

          {/* Right Sidebar - Featured (23%) */}
          <div className="hidden xl:block w-[400px] flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
