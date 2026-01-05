import { contentManager } from "@/storage/database";
import { ContentManager } from "@/components/admin/ContentManager";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session?.value === 'authenticated';
}

export default async function ContentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; category?: string }>;
}) {
  // Check authentication
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

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