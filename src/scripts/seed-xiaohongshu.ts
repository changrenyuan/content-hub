import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '../storage/database/shared/schema';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || process.env.PGDATABASE_URL,
});

const db = drizzle(pool, { schema });

// 小红书风格内容数据
const xiaohongshuContents = [
  {
    title: 'Notion 让我效率提升了300%',
    description: '从混乱到有序，我用 Notion 搭建了个人知识管理系统。包含任务管理、学习笔记、项目追踪，一套模板搞定所有需求。',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=1000&fit=crop',
    sourceUrl: 'https://www.notion.so',
    published: true,
    featured: true,
    viewCount: 5234,
    likeCount: 489,
  },
  {
    title: 'Figma 私藏插件合集',
    description: '整理了10个必备的 Figma 插件，从自动布局到设计系统，让你的设计效率翻倍！设计师必备收藏。',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=1200&fit=crop',
    sourceUrl: 'https://www.figma.com',
    published: true,
    featured: true,
    viewCount: 7892,
    likeCount: 623,
  },
  {
    title: '程序员必备的5个VS Code插件',
    description: '写代码更舒服！这些插件让你的开发效率提升，包括代码格式化、智能提示、Git集成等。',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=900&fit=crop',
    sourceUrl: 'https://code.visualstudio.com',
    published: true,
    featured: false,
    viewCount: 3421,
    likeCount: 234,
  },
  {
    title: 'Tailwind CSS 实战技巧分享',
    description: '别再手写 CSS 了！Tailwind CSS 让你快速构建现代 UI。这篇笔记分享常用的实用技巧和最佳实践。',
    imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=1100&fit=crop',
    sourceUrl: 'https://tailwindcss.com',
    published: true,
    featured: true,
    viewCount: 4567,
    likeCount: 345,
  },
  {
    title: 'GitHub Copilot 让编程变简单',
    description: 'AI 编程助手实测体验。GitHub Copilot 能智能补全代码，生成函数，甚至写测试。解放生产力！',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=1000&fit=crop',
    sourceUrl: 'https://github.com/features/copilot',
    published: true,
    featured: true,
    viewCount: 8923,
    likeCount: 756,
  },
  {
    title: '设计师都在用的配色工具',
    description: '配色太难？这5个工具帮你快速找到完美的配色方案。从渐变生成到色彩理论，应有尽有。',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=800&fit=crop',
    sourceUrl: '#',
    published: true,
    featured: false,
    viewCount: 2341,
    likeCount: 189,
  },
  {
    title: 'React 19 新特性抢先看',
    description: 'React 19 带来了哪些新特性？Server Actions、Suspense 改进、新的 Hooks。一起来了解最新进展。',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=950&fit=crop',
    sourceUrl: 'https://react.dev',
    published: true,
    featured: true,
    viewCount: 6543,
    likeCount: 523,
  },
  {
    title: 'Next.js 14 完全指南',
    description: '从零开始学习 Next.js 14。App Router、Server Components、Route Handlers。全栈开发入门必备。',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=1200&fit=crop',
    sourceUrl: 'https://nextjs.org',
    published: true,
    featured: true,
    viewCount: 7890,
    likeCount: 645,
  },
  {
    title: 'TypeScript 进阶技巧',
    description: '超越基础类型，掌握 TypeScript 高级特性。泛型、类型守卫、装饰器。写出类型安全的代码。',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=850&fit=crop',
    sourceUrl: 'https://www.typescriptlang.org',
    published: true,
    featured: false,
    viewCount: 3256,
    likeCount: 278,
  },
  {
    title: 'Dribbble 灵感收集指南',
    description: '如何在 Dribbble 上找到高质量的设计灵感？搜索技巧、筛选方法、收藏管理。设计师必看。',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a9?w=800&h=1100&fit=crop',
    sourceUrl: 'https://dribbble.com',
    published: true,
    featured: false,
    viewCount: 2890,
    likeCount: 234,
  },
  {
    title: 'Prisma 数据库ORM',
    description: '类型安全的数据库访问。Prisma 让你在 Node.js 中轻松操作数据库。自动生成类型、迁移管理。',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=900&fit=crop',
    sourceUrl: 'https://www.prisma.io',
    published: true,
    featured: false,
    viewCount: 2345,
    likeCount: 189,
  },
  {
    title: 'PostgreSQL 性能优化',
    description: '数据库太慢？10个 PostgreSQL 性能优化技巧。索引优化、查询调优、缓存策略。',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=1000&fit=crop',
    sourceUrl: '#',
    published: true,
    featured: false,
    viewCount: 3456,
    likeCount: 267,
  },
  {
    title: 'Docker 容器化部署',
    description: '容器化开发生产环境一致。Docker 基础到进阶，Compose 编排、镜像构建、容器编排。',
    imageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=950&fit=crop',
    sourceUrl: 'https://www.docker.com',
    published: true,
    featured: false,
    viewCount: 4567,
    likeCount: 345,
  },
  {
    title: 'Vite 快速构建工具',
    description: '比 Webpack 快10倍！Vite 开发体验极好。热更新、按需编译、插件生态。',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=1100&fit=crop',
    sourceUrl: 'https://vitejs.dev',
    published: true,
    featured: false,
    viewCount: 3890,
    likeCount: 298,
  },
  {
    title: 'Git 工作流最佳实践',
    description: '团队协作必备。Git Flow、GitHub Flow、Trunk Based Development。选择适合你的工作流。',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=800&fit=crop',
    sourceUrl: 'https://git-scm.com',
    published: true,
    featured: false,
    viewCount: 3123,
    likeCount: 245,
  },
  {
    title: 'RESTful API 设计规范',
    description: '设计优雅的 API 接口。REST 原则、HTTP 方法、状态码、版本控制。后端开发必读。',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=950&fit=crop',
    sourceUrl: '#',
    published: true,
    featured: false,
    viewCount: 2789,
    likeCount: 212,
  },
  {
    title: 'GraphQL 入门教程',
    description: 'API 查询的革命。GraphQL 让客户端精确获取所需数据。类型系统、查询语法、最佳实践。',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=1200&fit=crop',
    sourceUrl: 'https://graphql.org',
    published: true,
    featured: false,
    viewCount: 3234,
    likeCount: 256,
  },
  {
    title: 'Redis 缓存加速',
    description: '让你的应用飞起来。Redis 数据结构、持久化、集群部署。缓存设计模式和最佳实践。',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=900&fit=crop',
    sourceUrl: 'https://redis.io',
    published: true,
    featured: false,
    viewCount: 2890,
    likeCount: 223,
  },
  {
    title: 'AI 辅助编程实战',
    description: 'ChatGPT、Claude、Copilot 如何帮助编程？代码生成、Bug 修复、代码审查、文档生成。',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=1000&fit=crop',
    sourceUrl: '#',
    published: true,
    featured: false,
    viewCount: 5678,
    likeCount: 456,
  },
  {
    title: '前端性能优化指南',
    description: '提升用户体验的关键。资源加载优化、渲染性能优化、网络优化、代码分割。Web Vitals 详解。',
    imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=1100&fit=crop',
    sourceUrl: '#',
    published: true,
    featured: false,
    viewCount: 4234,
    likeCount: 345,
  },
];

async function seedXiaohongshu() {
  console.log('🌱 开始填充小红书风格数据...');

  try {
    // 清空现有内容
    console.log('🗑️  清空现有内容...');
    await db.delete(schema.contents);
    console.log('✅ 内容已清空');

    // 获取分类
    const categories = await db.select().from(schema.categories);
    console.log(`📂 找到 ${categories.length} 个分类`);

    // 插入内容
    console.log('📝 插入小红书风格内容...');
    for (const content of xiaohongshuContents) {
      // 随机分配分类
      const category = categories[Math.floor(Math.random() * categories.length)];

      const inserted = await db.insert(schema.contents).values({
        ...content,
        categoryId: category.id,
        tags: ['工具', '效率', '推荐', '收藏'],
      }).returning();

      console.log(`✅ "${content.title}" - ${category.name}`);
    }

    console.log(`\n🎉 成功插入 ${xiaohongshuContents.length} 条小红书风格内容！`);

  } catch (error) {
    console.error('❌ 填充数据失败:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedXiaohongshu();
