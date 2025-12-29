# Content Hub 部署指南

## 项目概述

这是一个基于 Next.js 16 + TypeScript + Tailwind CSS 的内容收藏分享平台，类似小红书、少数派。

### 主要功能
- ✅ **内容管理**：管理员可以手动添加、编辑、删除内容
- ✅ **分类整理**：内容按类别组织（工具、资源、文章等）
- ✅ **用户评论**：访客可以对内容发表评论
- ✅ **公开分享**：所有内容公开可见，支持分享链接
- ❌ **用户提交**：只有管理员可以发布内容，用户只能浏览和评论

---

## 一、本地开发

### 1. 环境要求
- Node.js 18+ 
- PostgreSQL 数据库

### 2. 安装依赖
```bash
cd content-hub
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件：
```env
# PostgreSQL 数据库连接
DATABASE_URL="postgresql://用户名:密码@localhost:5432/数据库名"

# 可选：管理员访问密钥（如果需要）
# ADMIN_SECRET="your-secret-key"
```

### 4. 初始化数据库

运行数据库迁移脚本：
```bash
npx drizzle-kit push
```

或者手动创建表结构（参考 `src/storage/database/shared/schema.ts`）

### 5. 启动开发服务器
```bash
npm run dev
```

访问：http://localhost:3000

---

## 二、部署到 Vercel（推荐）

### 步骤 1：准备代码仓库

将代码推送到 GitHub/GitLab：
```bash
git init
git add .
git commit -m "Initial commit: Content Hub"
git branch -M main
git remote add origin https://github.com/你的用户名/content-hub.git
git push -u origin main
```

### 步骤 2：创建 PostgreSQL 数据库

推荐使用以下托管服务（都有免费套餐）：
- **Neon** (https://neon.tech) - 推荐，免费额度大
- **Supabase** (https://supabase.com)
- **PlanetScale** (https://planetscale.com)

以 Neon 为例：
1. 注册并创建新项目
2. 创建数据库
3. 复制连接字符串，格式如：
   ```
   postgresql://用户名:密码@xxx.aws.neon.tech/数据库名?sslmode=require
   ```

### 步骤 3：部署到 Vercel

1. 访问 https://vercel.com/new
2. 导入你的 GitHub 仓库
3. 配置环境变量：
   ```
   DATABASE_URL = postgresql://用户名:密码@xxx.aws.neon.tech/数据库名?sslmode=require
   ```
4. 点击 "Deploy"

Vercel 会自动构建和部署，几分钟后即可访问。

### 步骤 4：运行数据库迁移

部署完成后，需要在 Vercel 上运行数据库迁移：

方式一：使用 Vercel Postgres（如果使用 Supabase）
- Vercel 会自动处理迁移

方式二：手动运行（推荐）
1. 在本地配置生产环境变量：
   ```env
   DATABASE_URL="生产数据库连接字符串"
   ```
2. 运行迁移：
   ```bash
   npx drizzle-kit push
   ```

或者创建一个迁移脚本，在 Vercel 上通过 CLI 运行。

---

## 三、使用指南

### 管理员后台（添加内容）

访问：`https://你的域名/admin`

**功能：**
- 查看所有内容列表
- 添加新内容（标题、描述、分类、链接、封面图）
- 编辑现有内容
- 删除内容
- 管理分类

**添加内容步骤：**
1. 进入管理后台
2. 点击 "添加新内容"
3. 填写内容信息：
   - 标题：内容标题
   - 描述：详细描述
   - 分类：选择或创建分类
   - 链接：原始内容链接
   - 封面图：图片 URL
4. 保存发布

### 前台展示（用户浏览）

访问：`https://你的域名`

**功能：**
- 浏览所有公开内容
- 按分类筛选
- 查看内容详情
- 发表评论
- 分享内容

---

## 四、项目结构

```
content-hub/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # 管理后台页面
│   │   │   ├── page.tsx        # 管理后台首页
│   │   │   ├── contents/       # 内容管理
│   │   │   └── categories/     # 分类管理
│   │   ├── api/                # API 路由
│   │   │   ├── admin/          # 管理员 API
│   │   │   ├── contents/       # 内容接口
│   │   │   └── comments/       # 评论接口
│   │   └── page.tsx            # 前台首页
│   ├── components/             # React 组件
│   │   ├── admin/              # 管理后台组件
│   │   └── public/             # 前台展示组件
│   └── storage/                # 数据层
│       └── database/           # 数据库操作
│           ├── db.ts           # 数据库连接
│           ├── schema.ts       # 数据模型
│           ├── contentManager.ts
│           ├── categoryManager.ts
│           └── commentManager.ts
├── public/                     # 静态资源
├── next.config.ts             # Next.js 配置
├── tailwind.config.ts         # Tailwind CSS 配置
└── package.json
```

---

## 五、数据库模型

### Content（内容）
- id: 主键
- title: 标题
- description: 描述
- categoryId: 分类 ID
- link: 链接
- coverImage: 封面图
- createdAt: 创建时间
- updatedAt: 更新时间

### Category（分类）
- id: 主键
- name: 分类名称
- slug: URL 友好标识

### Comment（评论）
- id: 主键
- contentId: 内容 ID
- author: 评论者名称
- content: 评论内容
- createdAt: 创建时间

---

## 六、常见问题

### Q1: 部署后数据库连接失败？
**A:** 检查 Vercel 环境变量是否正确配置，确保 `DATABASE_URL` 包含正确的 SSL 设置（`?sslmode=require`）

### Q2: 如何修改管理员密码？
**A:** 目前项目未实现身份验证，你可以：
- 在 Vercel 上设置密码保护
- 或实现简单的登录系统（参考 Next.js Auth.js）

### Q3: 图片如何上传？
**A:** 当前使用外部图片 URL，如需上传功能：
- 集成 Cloudinary
- 或使用 Vercel Blob
- 或使用对象存储服务（OSS）

### Q4: 如何添加自定义域名？
**A:** 在 Vercel 项目设置中添加自定义域名，按照提示配置 DNS 即可。

### Q5: 数据库迁移失败？
**A:** 检查数据库连接和权限，确保数据库已创建，且用户有建表权限。

---

## 七、后续优化建议

- [ ] 实现用户登录和管理员认证
- [ ] 添加图片上传功能
- [ ] 实现内容搜索
- [ ] 添加标签系统
- [ ] 实现内容点赞/收藏
- [ ] 添加 RSS 订阅
- [ ] 优化移动端体验
- [ ] 添加内容统计分析

---

## 八、技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **数据库**: PostgreSQL
- **ORM**: Drizzle ORM
- **部署**: Vercel
- **图标**: Lucide React

---

## 九、获取帮助

如果遇到问题：
1. 查看项目 README.md
2. 查看 Next.js 官方文档
3. 查看 Drizzle ORM 文档
4. 检查 Vercel 部署日志

---

**祝你使用愉快！** 🚀
