# 自动保存图片到 Blob Storage 功能

## 功能概述

当通过 JSON 批量导入小红书内容时，系统可以自动下载外部图片并上传到 Vercel Blob Storage。这样可以：

1. **解决防盗链问题**：小红书等平台有防盗链保护，直接引用图片链接可能无法显示
2. **避免链接失效**：外部图片链接可能会失效，导致图片无法加载
3. **提高加载速度**：Blob Storage 有全球 CDN 加速，图片加载更快
4. **保证持久性**：图片保存在自己的存储中，不依赖外部平台

## 如何使用

### 方式一：通过管理界面

1. 访问 `/admin/xiaohongshu` 页面
2. 选择 **JSON 批量导入** 标签
3. 勾选 **自动保存图片到 Blob Storage** 复选框（默认已勾选）
4. 粘贴 JSON 数据
5. 点击 **批量导入**

### 方式二：通过 API 调用

在调用 `/api/admin/sync/xiaohongshu` API 时，添加 `autoSaveImages: true` 参数：

```javascript
const response = await fetch('/api/admin/sync/xiaohongshu', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    method: 'json',
    data: jsonData,
    autoSaveImages: true, // 启用自动保存图片
  }),
});
```

## JSON 数据格式

```json
[{
  "title": "我的年度18图🫧",
  "description": "明年也要和妈妈一起拍多多的照片～",
  "imageUrls": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "author": "小红薯",
  "authorAvatar": "https://example.com/avatar.jpg",
  "categoryId": "xhs_article",
  "tags": ["年度总结", "家庭"],
  "comments": [
    {"content": "太有爱了！", "nickname": "小明"},
    {"content": "妈妈一定很开心～", "nickname": "小红"}
  ]
}]
```

## 工作原理

1. **解析 JSON**：系统解析 JSON 数据，提取所有图片 URL
   - `imageUrls` 数组中的所有图片
   - `imageUrl` 单张封面图
   - `authorAvatar` 作者头像

2. **下载图片**：逐个下载图片
   - 使用 User-Agent 模拟浏览器请求
   - 支持防盗链网站（如小红书）
   - 验证图片类型（JPEG, PNG, GIF, WebP）

3. **上传到 Blob**：将下载的图片上传到 Vercel Blob
   - 自动生成唯一文件名
   - 存储路径：`xiaohongshu/[timestamp]_[random].jpg`
   - 作者头像路径：`xiaohongshu/avatars/[timestamp]_[random].jpg`

4. **替换 URL**：将原始 URL 替换为 Blob URL
   - 数据库中保存的是 Blob URL
   - 原始 URL 不会保留

5. **错误处理**：如果某张图片下载/上传失败
   - 保留原始 URL（作为降级方案）
   - 记录错误日志
   - 继续处理其他图片

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `autoSaveImages` | boolean | `true` | 是否启用自动保存图片 |
| `skipErrors` | boolean | `true` | 是否跳过错误并保留原始URL |
| `pathPrefix` | string | `'xiaohongshu'` | Blob 存储路径前缀 |

## 支持的图片类型

- JPEG / JPG
- PNG
- GIF
- WebP

## 限制说明

- **文件大小限制**：单张图片最大 4MB（Vercel Blob 限制）
- **批量处理**：一次导入建议不超过 50 条内容（避免超时）
- **并发下载**：串行下载图片（避免服务器压力过大）
- **网络要求**：需要能够访问外部图片 URL

## 优势和劣势

### 优势

✅ 解决防盗链问题  
✅ 避免链接失效  
✅ 提高加载速度（CDN）  
✅ 保证图片持久性  
✅ 降低外部依赖  

### 劣势

⚠️ 增加 Blob 存储成本（按存储量和流量计费）  
⚠️ 导入速度变慢（需要下载和上传）  
⚠️ 可能会超出 Blob 存储限制  

## 工具函数

项目提供了以下工具函数（`src/lib/imageUploader.ts`）：

### `downloadAndUploadImage(imageUrl, options?)`

下载单张图片并上传到 Blob。

```typescript
import { downloadAndUploadImage } from '@/lib/imageUploader';

const blobUrl = await downloadAndUploadImage('https://example.com/image.jpg', {
  skipErrors: true, // 失败时返回原始URL
  pathPrefix: 'xiaohongshu',
});
```

### `batchDownloadAndUploadImages(imageUrls, options?)`

批量下载并上传图片。

```typescript
import { batchDownloadAndUploadImages } from '@/lib/imageUploader';

const blobUrls = await batchDownloadAndUploadImages(
  ['https://example.com/1.jpg', 'https://example.com/2.jpg'],
  {
    skipErrors: true,
    onProgress: (current, total) => {
      console.log(`进度: ${current}/${total}`);
    },
  }
);
```

### `needsProxy(url)`

判断 URL 是否需要代理（防盗链）。

```typescript
import { needsProxy } from '@/lib/imageUploader';

if (needsProxy(imageUrl)) {
  console.log('这个图片需要特殊处理');
}
```

## 使用场景

### 场景 1：批量导入小红书内容

启用自动保存图片，确保所有内容图片都能正常显示。

```json
{
  "method": "json",
  "data": [...],
  "autoSaveImages": true
}
```

### 场景 2：快速导入（无需保存图片）

禁用自动保存图片，直接使用原始 URL（适用于测试或临时内容）。

```json
{
  "method": "json",
  "data": [...],
  "autoSaveImages": false
}
```

### 场景 3：程序化导入

在代码中使用工具函数处理图片。

```typescript
import { downloadAndUploadImage } from '@/lib/imageUploader';

// 处理单张图片
const blobUrl = await downloadAndUploadImage(externalImageUrl);
console.log('新的Blob URL:', blobUrl);
```

## 错误处理

### 常见错误

1. **图片下载失败**
   - 原因：外部图片链接无效或无法访问
   - 处理：保留原始 URL，记录错误日志

2. **图片类型不支持**
   - 原因：图片格式不在支持范围内
   - 处理：跳过该图片，保留原始 URL

3. **上传到 Blob 失败**
   - 原因：网络问题或 Blob 配置错误
   - 处理：保留原始 URL，记录错误日志

4. **文件大小超限**
   - 原因：图片超过 4MB 限制
   - 处理：跳过该图片，保留原始 URL

### 日志示例

成功日志：
```
✅ Image uploaded successfully: https://example.com/image.jpg -> https://arcgrqhbdefppob0.public.blob.vercel-storage.com/xiaohongshu/1234567890_abc123.jpg
```

失败日志：
```
❌ Failed to download and upload image: https://example.com/image.jpg Error: Failed to download image: 404 Not Found
```

## 性能优化建议

1. **批量导入限制**：单次导入不超过 50 条内容
2. **图片压缩**：在上传前压缩图片（减少存储和流量）
3. **异步处理**：对于大量内容，考虑使用队列系统
4. **监控 Blob 使用量**：定期检查 Blob 存储使用情况
5. **清理旧文件**：定期清理不再使用的图片

## 相关文档

- [Vercel Blob 存储配置](./BLOB_STORAGE.md)
- [小红书内容同步](../src/app/admin/xiaohongshu/page.tsx)
- [图片上传工具](../src/lib/imageUploader.ts)

## 常见问题

### Q: 自动保存图片会增加成本吗？

A: 是的，Vercel Blob 按存储量和流量计费。建议定期检查 Blob 使用情况，并清理不再使用的图片。

### Q: 如果某张图片下载失败怎么办？

A: 系统会保留原始 URL，不会影响其他图片的导入。你可以稍后手动更新这张图片。

### Q: 可以在导入后禁用自动保存吗？

A: 可以。已经导入的图片已经保存在 Blob 中，无法自动回退到原始 URL。需要手动重新导入。

### Q: 如何查看 Blob 中的所有图片？

A: 可以使用 `listFiles()` 函数或访问 Vercel Blob Dashboard。

### Q: 可以同时导入大量内容吗？

A: 不建议。大量导入会导致请求超时。建议分批导入，每次不超过 50 条内容。

## 更新日志

### 2025-01-XX

- 创建图片下载和上传工具函数（`src/lib/imageUploader.ts`）
- 更新小红书同步 API，支持自动保存图片到 Blob
- 添加配置选项 `autoSaveImages`
- 更新管理界面，添加自动保存图片复选框
- 添加详细的使用文档
