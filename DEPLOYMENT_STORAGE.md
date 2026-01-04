# 数据库和存储平台说明

## 当前配置

### 数据库：Neon Tech (PostgreSQL)
- **提供商：** Neon Tech
- **连接：** AWS 新加坡区 (`ap-southeast-1`)
- **URL：** `postgresql://neondb_owner@ep-old-poetry-a1064iwq-pooler.ap-southeast-1.aws.neon.tech/neondb`

**优势：**
- ✅ Serverless，按需计费
- ✅ 自动扩展，无需维护
- ✅ 支持连接池（已配置）
- ✅ 无服务器实例成本（空闲不收费）

### 对象存储：Vercel Blob Storage
- **提供商：** Vercel
- **类型：** 云对象存储

**优势：**
- ✅ 与 Vercel 平台深度集成
- ✅ 全球 CDN 分发
- ✅ 自动 HTTPS
- ✅ 支持大文件（最大 4MB）
- ✅ 无需额外配置

---

## 为什么不能用本地存储？

### Vercel Serverless 限制

1. **无状态实例**
   - 每次部署生成新实例
   - 本地文件不会持久化
   - 重启后数据丢失

2. **文件系统限制**
   - `/tmp` 目录临时可写
   - 其他目录只读
   - 无法保存用户文件

3. **多实例问题**
   - Vercel 可能同时运行多个实例
   - 本地文件无法共享
   - 用户体验不一致

---

## 存储方案对比

| 方案 | 开发环境 | 生产环境 | 成本 | 推荐度 |
|------|---------|---------|------|--------|
| **Vercel Blob** | ✅ | ✅ | 免费+按量 | ⭐⭐⭐⭐⭐ |
| **本地文件系统** | ✅ | ❌ | 免费 | ⭐⭐ |
| **自建 S3/MinIO** | ✅ | ✅ | 服务器成本 | ⭐⭐⭐ |
| **Cloudflare R2** | ✅ | ✅ | 免费+按量 | ⭐⭐⭐⭐ |

---

## 本地存储配置（仅开发环境）

如果需要在本地开发时使用本地存储，可以使用新增的 `/api/upload-local` 接口：

```typescript
// 开发环境使用本地存储
const uploadApi = process.env.NODE_ENV === 'development'
  ? '/api/upload-local'
  : '/api/upload';

const response = await fetch(uploadApi, {
  method: 'POST',
  body: formData,
});
```

### 特点
- ✅ 仅在 `NODE_ENV=development` 可用
- ✅ 文件保存在 `public/uploads/` 目录
- ✅ 重启后文件保留（本地开发）
- ❌ 生产环境会返回 403 错误

---

## 替代方案

### 1. Cloudflare R2（推荐替代）
```bash
# 安装
pnpm add @aws-sdk/client-s3

# 配置环境变量
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET_NAME=xxx
```

### 2. 自建 MinIO
- 在自己的服务器部署 MinIO
- 配置与 S3 兼容的 API
- 适合有服务器资源的场景

### 3. 阿里云 OSS / 腾讯云 COS
- 国内访问速度快
- 需要备案和实名认证

---

## Vercel Blob 免费额度

- **存储：** 500GB 免费
- **带宽：** 1TB 免费
- **请求数：** 10,000 次/月

对于中小型应用完全够用。

---

## 建议

**当前配置已经很合适：**
- Neon Tech 数据库：稳定、免费额度够用
- Vercel Blob：与平台集成最好，无需额外配置

**如果未来需要：**
- 流量增长 → 考虑 Cloudflare R2（更便宜）
- 国内用户 → 考虑阿里云 OSS（速度更快）
- 完全自控 → 部署自己的 MinIO

**不建议：**
- ❌ 在 Vercel 上使用本地存储（会丢失数据）
- ❌ 用自建数据库替代 Neon Tech（维护成本高）
