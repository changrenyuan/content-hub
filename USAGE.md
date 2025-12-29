# 快速使用指南

## 🚀 三步启动本地开发

### 1️⃣ 安装依赖
```bash
npm install
```

### 2️⃣ 配置数据库
创建 `.env.local` 文件：
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/contenthub"
```

### 3️⃣ 启动服务
```bash
npm run dev
```

访问：
- 前台：http://localhost:3000
- 管理后台：http://localhost:3000/admin

---

## 🌐 部署到 Vercel（免费）

### 1. 推送到 GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 2. 获取数据库
访问 https://neon.tech，创建免费 PostgreSQL 数据库，复制连接字符串

### 3. 部署到 Vercel
1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库
3. 添加环境变量：
   ```
   DATABASE_URL = postgresql://用户名:密码@xxx.aws.neon.tech/数据库名?sslmode=require
   ```
4. 点击 Deploy

### 4. 运行数据库迁移
```bash
npx drizzle-kit push
```

---

## 📖 详细文档

查看完整部署文档：[DEPLOYMENT.md](./DEPLOYMENT.md)

---

## ⚡ 使用快速启动脚本

```bash
chmod +x quick-start.sh
./quick-start.sh
```

脚本会自动：
- 检查环境
- 安装依赖
- 配置数据库
- 启动开发服务器

---

## 🎯 功能说明

### 管理员（你）
- ✅ 添加内容：访问 /admin，填写标题、描述、链接、分类
- ✅ 管理分类：创建、编辑分类
- ✅ 编辑/删除内容：在后台管理所有发布的内容

### 访客（用户）
- ✅ 浏览内容：查看所有公开内容
- ✅ 按分类筛选：查找感兴趣的内容
- ✅ 发表评论：对内容进行讨论
- ✅ 分享内容：复制链接分享给他人
- ❌ 不能发布内容：只有管理员可以添加

---

## 🛠️ 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 生产运行
npm run start

# 数据库迁移
npm run db:push

# 数据库可视化管理（可选）
npm run db:studio
```

---

## 📂 项目结构

```
src/
├── app/
│   ├── admin/        # 管理后台（添加内容）
│   ├── api/          # API 接口
│   └── page.tsx      # 前台首页
├── components/       # 组件
└── storage/          # 数据库操作
```

---

## 💡 下一步

- 📖 阅读 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解详细配置
- 🎨 修改 `src/app/layout.tsx` 自定义网站名称
- 📝 添加你的第一个内容（访问 /admin）
- 🌏 部署到 Vercel 让全世界访问

---

**需要帮助？** 查看完整文档或联系技术支持
