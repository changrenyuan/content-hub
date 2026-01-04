/**
 * 判断URL是否需要使用代理
 * 小红书的图片需要使用代理来避免防盗链
 */
export function needsProxy(imageUrl: string): boolean {
  if (!imageUrl) return false;

  // 小红书域名列表
  const xhsDomains = [
    'xhscdn.com',
    'xiaohongshu.com',
    'sns-webpic-qc.xhscdn.com',
  ];

  try {
    const url = new URL(imageUrl);
    return xhsDomains.some(domain => url.hostname.includes(domain));
  } catch {
    return false;
  }
}

/**
 * 获取图片的最终URL（如果需要则使用代理）
 */
export function getImageUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;

  // 如果是小红书的图片，使用代理
  if (needsProxy(imageUrl)) {
    return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
  }

  // 其他图片直接返回原URL
  return imageUrl;
}
