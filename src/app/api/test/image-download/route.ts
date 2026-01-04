import { NextRequest, NextResponse } from 'next/server';
import { downloadAndUploadImage } from '@/lib/imageUploader';

/**
 * 测试图片下载并上传到Blob的功能
 * POST /api/test/image-download
 * Body: { imageUrl: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'imageUrl is required' },
        { status: 400 }
      );
    }

    console.log('🔄 Starting image download and upload...');
    console.log('📥 Source URL:', imageUrl);

    // 下载并上传图片
    const blobUrl = await downloadAndUploadImage(imageUrl, {
      skipErrors: false,
      pathPrefix: 'test',
    });

    console.log('✅ Upload completed:', blobUrl);

    return NextResponse.json({
      success: true,
      originalUrl: imageUrl,
      blobUrl: blobUrl,
      message: 'Image downloaded and uploaded successfully',
    });
  } catch (error) {
    console.error('❌ Test failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
