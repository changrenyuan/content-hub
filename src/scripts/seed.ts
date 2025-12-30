import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '../storage/database/shared/schema';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || process.env.PGDATABASE_URL,
});

const db = drizzle(pool, { schema });

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // Insert categories
    console.log('📂 Inserting categories...');
    const categories = await db.insert(schema.categories).values([
      {
        name: '工具推荐',
        slug: 'tools',
        description: '实用的工具软件推荐',
        isActive: true,
      },
      {
        name: '设计灵感',
        slug: 'design',
        description: 'UI/UX 设计灵感资源',
        isActive: true,
      },
      {
        name: '开发资源',
        slug: 'development',
        description: '编程学习与开发工具',
        isActive: true,
      },
      {
        name: '阅读文章',
        slug: 'articles',
        description: '优质技术文章',
        isActive: true,
      },
      {
        name: '视频教程',
        slug: 'videos',
        description: '学习视频资源',
        isActive: true,
      },
    ]).returning();

    console.log(`✅ Inserted ${categories.length} categories`);

    // Insert sample contents
    console.log('📝 Inserting sample contents...');
    const contents = await db.insert(schema.contents).values([
      {
        title: 'Notion - 你的全能工作空间',
        description: 'Notion 是一款集笔记、知识库、任务管理于一体的生产力工具，支持多人协作，界面简洁美观。',
        categoryId: categories[0].id,
        sourceUrl: 'https://www.notion.so',
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
        published: true,
        featured: true,
        viewCount: 1205,
        likeCount: 89,
      },
      {
        title: 'Figma - 协作式界面设计工具',
        description: 'Figma 是一款基于浏览器的协作式界面设计工具，支持多人实时协作，功能强大，已成为设计师的首选工具。',
        categoryId: categories[1].id,
        sourceUrl: 'https://www.figma.com',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        published: true,
        featured: true,
        viewCount: 2341,
        likeCount: 156,
      },
      {
        title: 'React 官方文档',
        description: 'React 是用于构建用户界面的 JavaScript 库，由 Facebook 开发维护。官方文档提供了详细的学习资源。',
        categoryId: categories[2].id,
        sourceUrl: 'https://react.dev',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
        published: true,
        featured: true,
        viewCount: 890,
        likeCount: 67,
      },
      {
        title: 'Next.js 16 文档',
        description: 'Next.js 是 React 的全栈框架，提供了服务端渲染、静态生成、API 路由等强大功能。',
        categoryId: categories[2].id,
        sourceUrl: 'https://nextjs.org',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
        published: true,
        featured: false,
        viewCount: 756,
        likeCount: 54,
      },
      {
        title: 'Tailwind CSS 文档',
        description: 'Tailwind CSS 是一个功能类优先的 CSS 框架，可以快速构建现代用户界面。',
        categoryId: categories[2].id,
        sourceUrl: 'https://tailwindcss.com',
        imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop',
        published: true,
        featured: false,
        viewCount: 623,
        likeCount: 45,
      },
      {
        title: 'Dribbble - 设计师灵感社区',
        description: 'Dribbble 是一个设计师社区，可以浏览全球设计师的作品，获取设计灵感。',
        categoryId: categories[1].id,
        sourceUrl: 'https://dribbble.com',
        imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=600&fit=crop',
        published: true,
        featured: true,
        viewCount: 1890,
        likeCount: 123,
      },
      {
        title: 'GitHub - 开发者协作平台',
        description: 'GitHub 是全球最大的代码托管平台，支持 Git 版本控制，提供了 Issues、Pull Requests 等协作功能。',
        categoryId: categories[2].id,
        sourceUrl: 'https://github.com',
        imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop',
        published: true,
        featured: true,
        viewCount: 3245,
        likeCount: 234,
      },
    ]).returning();

    console.log(`✅ Inserted ${contents.length} contents`);

    // Insert some sample comments
    console.log('💬 Inserting sample comments...');
    const comments = await db.insert(schema.comments).values([
      {
        contentId: contents[0].id,
        authorName: '张三',
        authorEmail: 'zhangsan@example.com',
        content: '非常实用的工具，我每天都用 Notion 管理工作！',
        isApproved: true,
      },
      {
        contentId: contents[1].id,
        authorName: '李四',
        authorEmail: 'lisi@example.com',
        content: 'Figma 的协作功能太棒了，团队工作效率提升很多。',
        isApproved: true,
      },
      {
        contentId: contents[5].id,
        authorName: '王五',
        authorEmail: 'wangwu@example.com',
        content: 'Dribbble 上的作品质量都很高，经常能找到灵感。',
        isApproved: true,
      },
      {
        contentId: contents[6].id,
        authorName: '赵六',
        authorEmail: 'zhaoliu@example.com',
        content: 'GitHub 是开发者的必备工具，开源社区太重要了。',
        isApproved: true,
      },
    ]).returning();

    console.log(`✅ Inserted ${comments.length} comments`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`\nSummary:`);
    console.log(`  - Categories: ${categories.length}`);
    console.log(`  - Contents: ${contents.length}`);
    console.log(`  - Comments: ${comments.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
