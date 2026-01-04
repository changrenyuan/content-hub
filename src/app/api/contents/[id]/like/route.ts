import { NextRequest, NextResponse } from 'next/server';
import { contentManager } from '@/storage/database';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await contentManager.incrementLikeCount(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error liking content:', error);
    return NextResponse.json(
      { error: 'Failed to like content' },
      { status: 500 }
    );
  }
}
