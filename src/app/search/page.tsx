import { Suspense } from 'react';
import { SearchClient } from './SearchClient';

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchClient />
    </Suspense>
  );
}

function SearchLoading() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-[#E8E2DA]">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="h-10 bg-[#E8E2DA] rounded-full animate-pulse" />
        </div>
      </div>
      <div className="max-w-[1800px] mx-auto px-8 py-8">
        <div className="h-6 bg-[#E8E2DA] rounded w-1/3 mb-2 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-[#E8E2DA] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
