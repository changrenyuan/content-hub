# 部署环境配置指南

## ✅ 问题已解决

服务器错误 "Digest: 3358927480" 已成功修复！应用现在正常运行。

---

## 🔧 问题原因

1. **数据库连接未配置**
   - 缺少 `.env` 文件
   - `DATABASE_URL` 环境变量未设置

2. **Drizzle 配置缺失**
   - `drizzle.config.ts` 不在项目根目录

3. **环境变量加载问题**
   - 生产环境运行时无法读取数据库配置

---

## ✨ 解决方案

### 1. 添加的配置文件

#### `.env` (开发环境)
```env
DATABASE_URL=postgresql://用户名:密码@主机:端口/数据库名?sslmode=require
```

#### `drizzle.config.ts` (Drizzle ORM 配置)
```typescript
import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.PGDATABASE_URL || process.env.DATABASE_URL || "";

export default defineConfig({
  schema: "./src/storage/database/shared/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
  strict: false,
});
```

#### `src/scripts/seed.ts` (数据初始化脚本)
用于填充初始数据：
- 5 个分类
- 7 个示例内容
- 4 条示例评论

---

## 🚀 部署步骤

### Vercel 部署（推荐）

#### 步骤 1：配置数据库

在 Vercel 项目设置中添加环境变量：

```
DATABASE_URL = postgresql://用户名:密码@主机:端口/数据库名?sslmode=require
```

#### 步骤 2：运行数据库迁移

在本地配置生产环境变量后：

```bash
# 创建 .env.production.local
DATABASE_URL="生产数据库连接字符串"

# 推送数据库结构
npx drizzle-kit push

# 或者生成并运行迁移文件
npx drizzle-kit generate
npx drizzle-kit migrate
```

#### 步骤 3：初始化数据（可选）

```bash
# 填充初始数据
npx tsx src/scripts/seed.ts
```

#### 步骤 4：推送代码并部署

```bash
git add .
git commit -m "Configure database for production"
git push origin main
```

Vercel 会自动检测到推送并开始部署。

---

## 📋 验证部署

部署完成后，访问以下端点验证：

### 1. 分类 API
```bash
curl https://你的域名/api/categories
```

预期输出：
```json
[
  {
    "id": "xxx",
    "name": "工具推荐",
    "slug": "tools",
    ...
  }
]
```

### 2. 内容 API
```bash
curl https://你的域名/api/admin/contents
```

### 3. 前台页面
访问：https://你的域名

### 4. 管理后台
访问：https://你的域名/admin

---

## 🔒 安全注意事项

### 环境变量安全

1. **不要提交 .env 文件到 Git**
   - `.env` 已在 `.gitignore` 中
   - 避免泄露敏感信息

2. **使用 Vercel 环境变量**
   - 在 Vercel 项目设置中配置
   - 不要硬编码在代码中

3. **使用 SSL 连接**
   - 数据库连接必须包含 `?sslmode=require`
   - 确保数据传输加密

---

## 🐛 故障排查

### 问题 1：数据库连接失败

**错误信息**：
```
Database connection failed, retrying...
AggregateError: ECONNREFUSED
```

**解决方案**：
1. 检查 `DATABASE_URL` 是否正确配置
2. 确认数据库服务器可访问
3. 检查防火墙设置

### 问题 2：页面显示 500 错误

**错误信息**：
```
Application error: a server-side exception has occurred
Digest: 3358927480
```

**解决方案**：
1. 检查 Vercel 部署日志
2. 确认环境变量已配置
3. 验证数据库表结构

### 问题 3：API 返回错误

**错误信息**：
```json
{
  "error": "Failed to fetch categories"
}
```

**解决方案**：
1. 确认数据库中有数据
2. 运行 `npx tsx src/scripts/seed.ts` 初始化数据
3. 检查 API 路由配置

---

## 📊 数据库初始化

### 运行 Seed 脚本

```bash
# 开发环境
DATABASE_URL="开发数据库URL" npx tsx src/scripts/seed.ts

# 生产环境
DATABASE_URL="生产数据库URL" npx tsx src/scripts/seed.ts
```

### 预期输出

```
🌱 Starting database seeding...
📂 Inserting categories...
✅ Inserted 5 categories
📝 Inserting sample contents...
✅ Inserted 7 contents
💬 Inserting sample comments...
✅ Inserted 4 comments

🎉 Database seeding completed successfully!

Summary:
  - Categories: 5
  - Contents: 7
  - Comments: 4
```

---

## 🎯 下一步

1. **推送代码到 GitHub**
2. **在 Vercel 配置环境变量**
3. **等待自动部署完成**
4. **运行数据库迁移**
5. **初始化数据**
6. **测试所有功能**

---

## 📚 相关文档

- **DEPLOYMENT.md** - 完整部署文档
- **BUILD_FIX.md** - 构建错误修复说明
- **USAGE.md** - 快速使用指南

---

## 💬 获取帮助

如果遇到问题：

1. 检查 Vercel 部署日志
2. 验证环境变量配置
3. 确认数据库连接正常
4. 查看相关文档

---

**部署配置已完成！现在可以安全部署到生产环境了！** 🚀
