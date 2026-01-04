import { NextRequest, NextResponse } from 'next/server';
import { contentManager, commentManager } from '@/storage/database';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const contentId = searchParams.get('contentId');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!contentId) {
      return NextResponse.json(
        { error: 'contentId is required' },
        { status: 400 }
      );
    }

    const comments = await commentManager.getCommentsByContentId(contentId, true);

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, content, userName = '访客', authorEmail = 'anonymous@example.com' } = body;

    if (!contentId || !content) {
      return NextResponse.json(
        { error: 'contentId and content are required' },
        { status: 400 }
      );
    }

    // 验证内容是否存在
    const existingContent = await contentManager.getContentById(contentId);
    if (!existingContent) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    const newComment = await commentManager.createComment({
      contentId,
      content,
      authorName: userName,
      authorEmail,
    });

    return NextResponse.json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
