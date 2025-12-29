import { contentManager } from "@/storage/database";
import { ContentManager } from "@/components/admin/ContentManager";

export default async function ContentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const search = params.search || '';
  const categoryId = params.category || '';
  
  const limit = 20;
  const skip = (page - 1) * limit;

  const contents = await contentManager.getContents({
    skip,
    limit,
    search,
    categoryId,
    includeUnpublished: true,
    orderBy: 'createdAt',
    orderDirection: 'desc'
  });

  return (
    <ContentManager 
      contents={contents} 
      currentPage={page}
      search={search}
      categoryId={categoryId}
    />
  );
}