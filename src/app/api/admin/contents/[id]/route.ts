import { NextRequest, NextResponse } from 'next/server';
import { contentManager } from '@/storage/database';

// GET /api/admin/contents/[id] - Get single content
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const content = await contentManager.getContentById(id);

    if (!content) {
      return NextResponse.json(
        { success: false, error: '内容不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Failed to fetch content:', error);
    return NextResponse.json(
      { success: false, error: '获取内容失败' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/contents/[id] - Update content
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedContent = await contentManager.updateContent(id, body);

    if (!updatedContent) {
      return NextResponse.json(
        { success: false, error: '内容不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedContent,
      message: '内容更新成功'
    });
  } catch (error) {
    console.error('Failed to update content:', error);
    return NextResponse.json(
      { success: false, error: '更新内容失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/contents/[id] - Delete content
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const success = await contentManager.deleteContent(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: '内容不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '内容删除成功'
    });
  } catch (error) {
    console.error('Failed to delete content:', error);
    return NextResponse.json(
      { success: false, error: '删除内容失败' },
      { status: 500 }
    );
  }
}