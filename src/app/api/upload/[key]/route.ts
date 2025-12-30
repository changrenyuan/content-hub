import { del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;

    // 验证 key 是否存在
    if (!key) {
      return NextResponse.json(
        { error: '文件 key 不能为空' },
        { status: 400 }
      );
    }

    // 从 Blob 存储中删除文件
    await del(key);

    return NextResponse.json({
      success: true,
      message: '文件删除成功',
      key,
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: '删除失败，请稍后重试' },
      { status: 500 }
    );
  }
}
