import { contentManager, categoryManager } from "@/storage/database";
import { Hero } from "@/components/home/Hero";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { RecentContents } from "@/components/home/RecentContents";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch data for homepage
  const featuredContents = await contentManager.getFeaturedContents(6);
  const categories = await categoryManager.getCategories({ limit: 8 });
  const recentContents = await contentManager.getRecentContents(8);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <Hero />

      {/* Featured Contents */}
      <FeaturedSection contents={featuredContents} />

      {/* Categories */}
      <CategoriesSection categories={categories} />

      {/* Recent Contents */}
      <RecentContents contents={recentContents} />
    </div>
  );
}