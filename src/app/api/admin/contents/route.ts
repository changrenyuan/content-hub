import { NextRequest, NextResponse } from 'next/server';
import { contentManager } from '@/storage/database';
import { insertContentSchema } from '@/storage/database/shared/schema';
import { z } from 'zod';

// POST /api/admin/contents - Create new content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the data
    const validatedData = insertContentSchema.parse(body);

    // Create the content
    const newContent = await contentManager.createContent(validatedData);

    return NextResponse.json({
      success: true,
      data: newContent,
      message: '内容创建成功'
    });
  } catch (error) {
    console.error('Failed to create content:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: '数据验证失败',
          details: error.issues 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: '创建内容失败' },
      { status: 500 }
    );
  }
}

// GET /api/admin/contents - Get contents (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId') || '';
    const featured = searchParams.get('featured');
    const published = searchParams.get('published');

    const skip = (page - 1) * limit;

    const filters: any = {};
    if (featured === 'true') filters.featured = true;
    if (featured === 'false') filters.featured = false;
    if (published === 'true') filters.published = true;
    if (published === 'false') filters.published = false;

    const contents = await contentManager.getContents({
      skip,
      limit,
      search,
      categoryId: categoryId || undefined,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
      includeUnpublished: true,
      orderBy: 'createdAt',
      orderDirection: 'desc'
    });

    return NextResponse.json({
      success: true,
      data: contents,
      pagination: {
        page,
        limit,
        total: contents.length,
        totalPages: Math.ceil(contents.length / limit)
      }
    });
  } catch (error) {
    console.error('Failed to fetch contents:', error);
    return NextResponse.json(
      { success: false, error: '获取内容失败' },
      { status: 500 }
    );
  }
}