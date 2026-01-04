# Vercel Blob Storage 配置说明

## 概述

本项目已成功集成 **Vercel Blob Storage**，用于处理图片上传和存储。Blob Storage 是 Vercel 提供的高性能对象存储服务，支持文件上传、删除、列表等操作。

## 配置信息

### 环境变量

在 `.env.local` 文件中已配置以下环境变量：

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_ARCgRQhBdEfpPOB0_3OcUTALk2SawbKcmVAD2TsFvyirYLi
```

### Blob Store 信息

- **Unique Store ID**: `store_ARCgRQhBdEfpPOB0`
- **Storage Region**: Hong Kong (HKG1)
- **Base URL**: `https://arcgrqhbdefppob0.public.blob.vercel-storage.com`

## API 端点

### 1. 上传文件

**POST** `/api/upload`

**请求参数** (FormData):
- `file`: 文件对象（支持 JPEG, PNG, GIF, WebP 格式）
- 最大文件大小：4MB

**响应示例**:
```json
{
  "url": "https://arcgrqhbdefppob0.public.blob.vercel-storage.com/uploads/1234567890_abc123.jpg",
  "downloadUrl": "https://arcgrqhbdefppob0.public.blob.vercel-storage.com/uploads/1234567890_abc123.jpg",
  "pathname": "uploads/1234567890_abc123.jpg",
  "size": 102400,
  "contentType": "image/jpeg"
}
```

### 2. 删除文件

**DELETE** `/api/upload/[key]`

**请求参数**:
- `key`: 文件的 pathname（例如：`uploads/1234567890_abc123.jpg`）

**响应示例**:
```json
{
  "success": true,
  "message": "文件删除成功",
  "key": "uploads/1234567890_abc123.jpg"
}
```

### 3. 本地上传（开发环境专用）

**POST** `/api/upload-local`

- 仅在开发环境可用
- 生产环境自动禁用
- 最大文件大小：10MB

## 工具函数

项目提供了统一的 Blob 工具函数，位于 `src/lib/blob.ts`：

### `uploadFile(file, options?)`

上传文件到 Blob Storage。

```typescript
import { uploadFile } from '@/lib/blob';

const result = await uploadFile(file, {
  path: 'custom/path',
  contentType: 'image/jpeg',
  addRandomSuffix: false,
});
```

### `deleteFile(key)`

删除 Blob Storage 中的文件。

```typescript
import { deleteFile } from '@/lib/blob';

await deleteFile('uploads/1234567890_abc123.jpg');
```

### `deleteFiles(keys)`

批量删除文件。

```typescript
import { deleteFiles } from '@/lib/blob';

await deleteFiles([
  'uploads/1.jpg',
  'uploads/2.jpg',
]);
```

### `listFiles(prefix?)`

列出 Blob Storage 中的文件。

```typescript
import { listFiles } from '@/lib/blob';

const blobs = await listFiles('uploads/');
```

### 其他辅助函数

- `getBlobKeyFromUrl(url)`: 从 URL 提取 Blob key
- `isVercelBlobUrl(url)`: 判断 URL 是否为 Blob URL
- `isSupportedImageType(contentType)`: 验证图片类型
- `formatFileSize(bytes)`: 格式化文件大小

## 前端组件

### ImageUpload 组件

位置：`src/components/admin/ImageUpload.tsx`

支持：
- 拖拽上传
- 点击上传
- 外部 URL 输入
- 图片预览
- 文件大小限制

使用示例：

```tsx
import { ImageUpload } from '@/components/admin/ImageUpload';

function MyComponent() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageUpload
      value={imageUrl}
      onChange={setImageUrl}
      maxSize={4 * 1024 * 1024} // 4MB
    />
  );
}
```

## 使用场景

### 1. 内容管理 - 图片上传

当创建或编辑内容时，可以使用 ImageUpload 组件上传封面图片：

```tsx
<ImageUpload
  value={formData.imageUrl}
  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
/>
```

### 2. 小红书内容同步

JSON 批量导入支持以下字段：

```json
{
  "title": "内容标题",
  "description": "内容描述",
  "imageUrl": "https://example.com/image.jpg",
  "imageUrls": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "author": "作者名称",
  "authorAvatar": "https://example.com/avatar.jpg",
  "comments": [
    {
      "content": "评论内容",
      "authorName": "评论者"
    }
  ]
}
```

### 3. 图片代理

项目包含图片代理 API (`/api/image-proxy`)，可以解决防盗链问题：

```typescript
const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`;
```

## 限制说明

- **单文件大小**: 4MB（Vercel Blob 限制）
- **支持格式**: JPEG, PNG, GIF, WebP
- **存储区域**: Hong Kong (HKG1)
- **访问权限**: Public（公开访问）

## 开发环境

在开发环境，可以启用本地存储作为替代方案：

1. 创建 `public/uploads` 目录
2. 使用 `/api/upload-local` API
3. 注意：本地存储仅用于开发，生产环境不可用

## 生产环境部署

项目已配置 Vercel Blob，部署到 Vercel 时：

1. 确保 `BLOB_READ_WRITE_TOKEN` 环境变量已配置
2. Blob Store 已关联到项目
3. 无需额外配置，自动生效

## 常见问题

### Q: 上传失败怎么办？

A: 检查以下几点：
- 环境变量 `BLOB_READ_WRITE_TOKEN` 是否正确配置
- 文件大小是否超过 4MB 限制
- 文件格式是否支持

### Q: 如何查看已上传的文件？

A: 使用 `listFiles()` 函数或直接访问 Vercel Blob Dashboard。

### Q: 图片防盗链问题如何解决？

A: 使用图片代理 API (`/api/image-proxy`)，服务器端转发图片请求。

### Q: 本地开发能否使用 Blob Storage？

A: 可以。Vercel Blob 在本地开发环境也能正常工作，无需切换到本地存储。

## 相关文档

- [Vercel Blob 官方文档](https://vercel.com/docs/storage/vercel-blob)
- [@vercel/blob NPM 包](https://www.npmjs.com/package/@vercel/blob)

## 更新日志

### 2025-01-XX

- 创建统一的 Blob 工具函数 (`src/lib/blob.ts`)
- 优化上传/删除 API，使用工具函数
- 更新 ImageUpload 组件，优化文件大小显示
- 修复 TypeScript 类型错误
- 添加 Blob Storage 配置文档
