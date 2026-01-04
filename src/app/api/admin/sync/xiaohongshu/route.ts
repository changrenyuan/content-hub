import { NextRequest, NextResponse } from 'next/server';
import { contentManager, commentManager } from '@/storage/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method, url, data, categoryId } = body;

    if (method === 'link') {
      // 链接导入 - 需要爬虫服务支持
      // 由于小红书没有公开 API，这里提供一个基础的框架
      // 实际使用时需要配置第三方爬虫服务或手动导入

      if (!url) {
        return NextResponse.json(
          { error: 'URL is required' },
          { status: 400 }
        );
      }

      // 模拟导入逻辑（实际需要爬虫服务）
      // 这里返回一个示例，表示需要配置爬虫服务
      return NextResponse.json({
        success: false,
        error: '链接导入功能需要配置第三方爬虫服务。请使用 JSON 批量导入或手动添加功能。',
        details: {
          url,
          note: '您可以：1. 使用 JSON 批量导入，2. 手动添加内容',
        },
      }, { status: 501 });

    } else if (method === 'json') {
      // JSON 批量导入
      if (!Array.isArray(data)) {
        return NextResponse.json(
          { error: 'Data must be an array' },
          { status: 400 }
        );
      }

      const results = {
        success: 0,
        failed: 0,
        errors: [] as string[],
      };

      const createdContentIds: string[] = [];

      // 先创建所有内容
      for (const item of data) {
        try {
          // 处理图片URLs：支持imageUrls数组，第一张作为封面图片
          let coverImageUrl = item.imageUrl || item.image || item.cover || '';
          const allImageUrls: string[] = [];

          // 如果有imageUrls数组
          if (Array.isArray(item.imageUrls) && item.imageUrls.length > 0) {
            allImageUrls.push(...item.imageUrls);
            // 如果封面图未设置，使用第一张作为封面
            if (!coverImageUrl) {
              coverImageUrl = item.imageUrls[0];
            }
          } else if (coverImageUrl) {
            // 如果只有单图，也存入数组
            allImageUrls.push(coverImageUrl);
          }

          const newContent = await contentManager.createContent({
            title: item.title || item.noteTitle || '',
            description: item.description || item.noteDesc || '',
            content: item.content || '',
            imageUrl: coverImageUrl,
            imageUrls: allImageUrls.length > 0 ? allImageUrls : undefined,
            sourceUrl: item.sourceUrl || item.url || '',
            categoryId: item.categoryId || null,
            tags: Array.isArray(item.tags) ? item.tags : [],
            published: item.published !== undefined ? item.published : true,
            featured: item.featured || false,
            sort: item.sort || 0,
          });

          createdContentIds.push(newContent.id);
          results.success++;
        } catch (error) {
          results.failed++;
          results.errors.push(`Failed to import: ${item.title || 'Unknown'} - ${error}`);
        }
      }

      // 然后为每个内容创建评论
      for (const item of data) {
        try {
          if (Array.isArray(item.comments) && item.comments.length > 0 && createdContentIds.length > 0) {
            const contentId = createdContentIds.shift();

            if (!contentId) continue;

            for (const comment of item.comments) {
              try {
                await commentManager.createComment({
                  contentId,
                  content: comment.content || comment.text || '',
                  authorName: comment.authorName || comment.nickname || '访客',
                  authorEmail: comment.authorEmail || 'anonymous@example.com',
                });
              } catch (err) {
                console.error('Failed to import comment:', err);
              }
            }
          }
        } catch (err) {
          console.error('Failed to import comments for item:', err);
        }
      }

      return NextResponse.json({
        success: results.success > 0,
        count: results.success,
        failed: results.failed,
        errors: results.errors,
      });

    } else {
      return NextResponse.json(
        { error: 'Invalid method. Supported: link, json' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Xiaohongshu sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync content' },
      { status: 500 }
    );
  }
}
