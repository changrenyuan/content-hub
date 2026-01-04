import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, isSupportedImageType, formatFileSize } from '@/lib/blob';

// 允许的图片类型
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;

// 最大文件大小：4MB (Vercel Blob 限制)
const MAX_FILE_SIZE = 4 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    // 验证文件是否存在
    if (!file) {
      return NextResponse.json(
        { error: '未选择文件' },
        { status: 400 }
      );
    }

    // 验证文件类型
    if (!isSupportedImageType(file.type)) {
      return NextResponse.json(
        { error: `不支持的文件类型：${file.type}。支持的类型：JPEG, PNG, GIF, WebP` },
        { status: 400 }
      );
    }

    // 验证文件大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `文件大小超过限制（最大 ${formatFileSize(MAX_FILE_SIZE)}）` },
        { status: 400 }
      );
    }

    // 上传到 Vercel Blob
    const result = await uploadFile(file, {
      contentType: file.type,
    });

    return NextResponse.json({
      url: result.url,
      downloadUrl: result.downloadUrl,
      pathname: result.pathname,
      size: file.size,
      contentType: result.contentType,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: '上传失败，请稍后重试' },
      { status: 500 }
    );
  }
}
