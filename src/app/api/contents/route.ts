import { NextRequest, NextResponse } from 'next/server';
import { contentManager } from '@/storage/database';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const sort = searchParams.get('sort') || 'recent';
    const category = searchParams.get('category');
    const contentType = searchParams.get('contentType') as 'beauty' | 'serious' | 'featured' | undefined;

    let orderBy: 'createdAt' | 'updatedAt' | 'viewCount' | 'likeCount' | 'sort' = 'createdAt';
    let orderDirection: 'asc' | 'desc' = 'desc';

    // Parse sort parameter
    if (sort === 'popular') {
      orderBy = 'likeCount';
      orderDirection = 'desc';
    } else if (sort === 'views') {
      orderBy = 'viewCount';
      orderDirection = 'desc';
    }

    const contents = await contentManager.getContents({
      limit,
      includeUnpublished: false,
      orderBy,
      orderDirection,
      categoryId: category || undefined,
      contentType: contentType,
    });

    return NextResponse.json(contents);
  } catch (error) {
    console.error('Error fetching contents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contents' },
      { status: 500 }
    );
  }
}
