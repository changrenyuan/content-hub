import { put, del, list } from '@vercel/blob';

/**
 * Vercel Blob 存储工具
 * 统一处理图片上传、删除等操作
 */

/**
 * 上传文件到 Vercel Blob
 * @param file - 文件对象
 * @param options - 上传选项
 * @returns 上传结果，包含 URL 和元数据
 */
export async function uploadFile(
  file: File | Buffer | ArrayBuffer,
  options?: {
    path?: string;
    contentType?: string;
    addRandomSuffix?: boolean;
  }
) {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  
  // 生成默认路径
  const defaultPath = options?.path
    ? options.path.replace(/\[timestamp\]/g, timestamp.toString())
    : `uploads/${timestamp}_${randomStr}`;
  
  // 处理文件名（如果提供了）
  let fileName = defaultPath;
  if (file instanceof File) {
    const extension = file.name.split('.').pop();
    fileName = `${defaultPath}.${extension}`;
  } else if (options?.contentType) {
    const extension = getExtensionFromContentType(options.contentType);
    fileName = `${defaultPath}.${extension}`;
  }

  // 上传到 Blob
  const blob = await put(fileName, file, {
    access: 'public',
    addRandomSuffix: options?.addRandomSuffix ?? false,
    contentType: options?.contentType,
  });

  return {
    url: blob.url,
    downloadUrl: blob.downloadUrl,
    pathname: blob.pathname,
    size: file instanceof File ? file.size : 0,
    contentType: blob.contentType,
  };
}

/**
 * 从 Vercel Blob 删除文件
 * @param key - 文件的 pathname（key）
 */
export async function deleteFile(key: string) {
  await del(key);
}

/**
 * 批量删除文件
 * @param keys - 文件的 pathname 数组
 */
export async function deleteFiles(keys: string[]) {
  await del(keys);
}

/**
 * 列出 Blob 存储中的文件
 * @param prefix - 路径前缀
 */
export async function listFiles(prefix?: string) {
  const { blobs } = await list({ prefix });
  return blobs;
}

/**
 * 从 Content-Type 获取文件扩展名
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
  return map[contentType] || 'bin';
}

/**
 * 从 URL 提取 Blob key（pathname）
 */
export function getBlobKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    // Vercel Blob URL 格式: https://[store].public.blob.vercel-storage.com/uploads/xxx.jpg
    const pathname = urlObj.pathname;
    // 移除开头的 /
    return pathname.startsWith('/') ? pathname.slice(1) : pathname;
  } catch {
    return null;
  }
}

/**
 * 判断 URL 是否为 Vercel Blob URL
 */
export function isVercelBlobUrl(url: string): boolean {
  return url.includes('.blob.vercel-storage.com');
}

/**
 * 验证文件类型是否支持
 */
export function isSupportedImageType(contentType: string): boolean {
  const supportedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  return supportedTypes.includes(contentType);
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
