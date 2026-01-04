import { uploadFile, isSupportedImageType } from './blob';

/**
 * 从外部URL下载图片并上传到Blob Storage
 * @param imageUrl - 外部图片URL
 * @param options - 可选配置
 * @returns Blob URL，如果失败则返回原始URL
 */
export async function downloadAndUploadImage(
  imageUrl: string,
  options?: {
    skipErrors?: boolean; // 是否跳过错误并返回原始URL
    pathPrefix?: string; // 路径前缀
  }
): Promise<string> {
  const { skipErrors = false, pathPrefix = 'imported' } = options || {};

  try {
    // 验证URL格式
    if (!imageUrl || !isValidUrl(imageUrl)) {
      throw new Error('Invalid image URL');
    }

    // 下载图片
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
    }

    // 获取图片内容类型
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // 验证是否为支持的图片类型
    if (!isSupportedImageType(contentType)) {
      throw new Error(`Unsupported image type: ${contentType}`);
    }

    // 获取图片内容
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();

    // 生成文件名
    const originalFileName = getFileNameFromUrl(imageUrl);
    const extension = getExtensionFromContentType(contentType);
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9);

    // 上传到Blob
    const result = await uploadFile(Buffer.from(buffer), {
      path: `${pathPrefix}/${timestamp}_${randomStr}`,
      contentType,
    });

    console.log(`✅ Image uploaded successfully: ${imageUrl} -> ${result.url}`);
    return result.url;

  } catch (error) {
    console.error(`❌ Failed to download and upload image: ${imageUrl}`, error);
    
    if (skipErrors) {
      return imageUrl; // 失败时返回原始URL
    }
    throw error;
  }
}

/**
 * 批量下载并上传图片到Blob Storage
 * @param imageUrls - 图片URL数组
 * @param options - 可选配置
 * @returns Blob URL数组
 */
export async function batchDownloadAndUploadImages(
  imageUrls: string[],
  options?: {
    skipErrors?: boolean;
    pathPrefix?: string;
    onProgress?: (current: number, total: number) => void;
  }
): Promise<string[]> {
  const { skipErrors = true, onProgress } = options || {};
  const results: string[] = [];

  for (let i = 0; i < imageUrls.length; i++) {
    try {
      const blobUrl = await downloadAndUploadImage(imageUrls[i], options);
      results.push(blobUrl);
    } catch (error) {
      console.error(`Failed to process image ${i + 1}/${imageUrls.length}:`, error);
      
      if (skipErrors) {
        results.push(imageUrls[i]); // 失败时保留原始URL
      } else {
        results.push(''); // 失败时返回空字符串
      }
    }

    // 回调进度
    if (onProgress) {
      onProgress(i + 1, imageUrls.length);
    }
  }

  return results;
}

/**
 * 验证URL格式
 */
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

/**
 * 从URL提取文件名
 */
function getFileNameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop() || 'image';
    return filename.split('.')[0];
  } catch {
    return 'image';
  }
}

/**
 * 从Content-Type获取文件扩展名
 */
function getExtensionFromContentType(contentType: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
  };
  return map[contentType] || 'jpg';
}

/**
 * 判断URL是否需要代理（防盗链）
 * 检查是否为需要特殊headers才能访问的网站
 */
export function needsProxy(url: string): boolean {
  const domainsThatNeedProxy = [
    'xiaohongshu.com',
    'xhslink.com',
    'alibaba.com',
    'taobao.com',
    'tmall.com',
  ];
  
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return domainsThatNeedProxy.some(domain => hostname.includes(domain));
  } catch {
    return false;
  }
}
