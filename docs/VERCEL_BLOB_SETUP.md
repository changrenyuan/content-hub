# Vercel Blob Storage 配置指南

## 步骤 1：在 Vercel 控制台启用 Blob Storage

### 1.1 登录 Vercel 控制台
1. 访问 https://vercel.com/dashboard
2. 选择你的项目（见地 IN SIGHT）

### 1.2 添加 Blob Storage
1. 进入项目后，点击 **Storage** 标签页
2. 点击 **Create Database** 或 **Add Integration**
3. 搜索并选择 **Blob**（不是 PostgreSQL）
4. 点击 **Add** 按钮

### 1.3 配置 Blob Store
- **Store Name**：可以默认或自定义（如 `content-hub-blob`）
- **Region**：选择离你最近的区域（推荐 Hong Kong 或 Singapore）
- 点击 **Create** 按钮

### 1.4 环境变量自动配置
Vercel 会自动为你添加以下环境变量：
```
BLOB_READ_WRITE_TOKEN
```

## 步骤 2：验证环境变量配置

### 2.1 检查环境变量
在 Vercel 项目中：
1. 进入 **Settings** → **Environment Variables**
2. 确认 `BLOB_READ_WRITE_TOKEN` 已存在

### 2.2 本地开发配置
如果要本地开发，需要手动添加到 `.env.local` 文件：

```bash
# 从 Vercel 控制台复制 BLOB_READ_WRITE_TOKEN
BLOB_READ_WRITE_TOKEN=vercel_blob_your_token_here
```

获取方法：
1. 在 Vercel 项目 → Settings → Environment Variables
2. 点击 `BLOB_READ_WRITE_TOKEN` 的 **眼睛图标**（显示/隐藏）
3. 复制完整的 token 值
4. 粘贴到本地 `.env.local` 文件

### 2.3 本地开发方式 2：使用 Vercel CLI
更推荐的方式是使用 `vercel env pull` 自动同步：

```bash
# 安装 Vercel CLI（如果未安装）
npm i -g vercel

# 登录 Vercel
vercel login

# 拉取环境变量到本地
vercel env pull .env.local
```

## 步骤 3：安装 Vercel Blob SDK

```bash
cd /workspace/projects/content-hub
pnpm add @vercel/blob
```

## 步骤 4：测试配置是否生效

在 Vercel 控制台：
1. 进入 **Storage** → **Blob** 标签页
2. 应该能看到 Blob Store 已创建
3. 可以查看上传的文件列表、存储用量等

## 步骤 5：注意事项

✅ **成功标志**
- 环境变量 `BLOB_READ_WRITE_TOKEN` 已配置
- 本地能成功调用 Blob API
- 文件能正常上传和访问

❌ **常见问题**
- Token 未复制完整（注意是否包含换行符）
- 本地开发未使用 `.env.local` 文件
- Node.js 版本过低（建议 18.x 或 20.x）

## 存储限制（免费版）

- **存储空间**：500 MB
- **带宽**：100 GB/月
- **单文件大小**：4 MB
- **并发请求**：无限制

如果超过限制，需要升级到 Pro 版本。

## 下一步

配置完成后，可以开始实现图片上传功能：
1. 创建 `/api/upload` 接口
2. 在管理后台添加图片上传组件
3. 实现图片预览和删除功能
