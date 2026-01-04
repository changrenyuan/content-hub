import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// 允许的图片类型
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;

// 最大文件大小：10MB (本地存储可以更大)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * 本地文件上传 API（仅用于开发环境）
 * 生产环境请使用 /api/upload (Vercel Blob)
 */
export async function POST(request: NextRequest) {
  try {
    // 仅允许开发环境使用
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: '本地存储仅在开发环境可用' },
        { status: 403 }
      );
    }

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
    if (!ALLOWED_TYPES.includes(file.type as any)) {
      return NextResponse.json(
        { error: `不支持的文件类型：${file.type}。支持的类型：JPEG, PNG, GIF, WebP` },
        { status: 400 }
      );
    }

    // 验证文件大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `文件大小超过限制（最大 10MB）` },
        { status: 400 }
      );
    }

    // 确保上传目录存在
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // 生成唯一的文件名
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}_${randomStr}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);

    // 保存文件到本地
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    // 返回文件URL（通过public目录访问）
    const url = `/uploads/${fileName}`;

    return NextResponse.json({
      url,
      pathname: `uploads/${fileName}`,
      size: file.size,
      contentType: file.type,
    });
  } catch (error) {
    console.error('Local upload error:', error);
    return NextResponse.json(
      { error: '上传失败，请稍后重试' },
      { status: 500 }
    );
  }
}
