# 小红书内容导入指南

## 评论导入机制

### 当前实现

评论导入功能已在 `/api/admin/sync/xiaohongshu/route.ts` 中实现，工作流程如下：

1. **第一阶段：创建内容**
   - 遍历JSON数据，先创建所有内容（contents表）
   - 保存所有创建的内容ID（createdContentIds数组）

2. **第二阶段：创建评论**
   - 再次遍历JSON数据
   - 使用 `createdContentIds.shift()` 获取对应的内容ID
   - 遍历每个评论，调用 `commentManager.createComment()` 创建

### 支持的字段映射

#### 内容字段
```javascript
{
  title: item.title || item.noteTitle || '',
  description: item.description || item.noteDesc || '',
  imageUrls: Array.isArray(item.imageUrls) ? item.imageUrls : [],
  imageUrl: item.imageUrl || item.image || item.cover || '',
  author: item.author || item.authorName || item.nickname || item.user?.nickname || item.user?.name || '',
  authorAvatar: item.authorAvatar || item.avatar || item.user?.avatar || item.user?.avatarUrl || '',
  categoryId: item.categoryId || null,
  tags: Array.isArray(item.tags) ? item.tags : [],
  sourceUrl: item.sourceUrl || item.url || ''
}
```

#### 评论字段
```javascript
{
  contentId: 从第一阶段获取的ID,
  content: comment.content || comment.text || '',
  authorName: comment.authorName || comment.nickname || '访客',
  authorEmail: comment.authorEmail || 'anonymous@example.com'
}
```

### JSON数据格式

#### 完整示例（推荐）

```json
[
  {
    "title": "我的年度18图🫧",
    "description": "明年也要和妈妈一起拍多多的照片～",
    "imageUrls": [
      "https://sns-webpic-qc.xhscdn.com/xxx/001.jpg",
      "https://sns-webpic-qc.xhscdn.com/xxx/002.jpg"
    ],
    "author": "小红薯",
    "authorAvatar": "https://sns-webpic-qc.xhscdn.com/xxx/avatar.jpg",
    "categoryId": "xhs_article",
    "tags": ["年度总结", "家庭", "照片"],
    "comments": [
      {
        "content": "太有爱了！",
        "nickname": "小明",
        "authorEmail": "xiaoming@example.com"
      },
      {
        "text": "妈妈一定很开心～",
        "authorName": "小红",
        "authorEmail": "xiaohong@example.com"
      }
    ]
  }
]
```

#### 简化示例（仅导入内容）

```json
[
  {
    "title": "我的年度总结",
    "description": "2024年回顾",
    "imageUrl": "https://xxx.com/image.jpg",
    "categoryId": "xhs_article"
  }
]
```

### 评论导入特点

1. **自动审核通过**
   - 所有导入的评论会自动设置 `isApproved = true`
   - 评论会立即显示在详情页

2. **灵活的字段名**
   - 评论内容支持：`content` 或 `text`
   - 评论昵称支持：`nickname` 或 `authorName`
   - 评论邮箱支持：`authorEmail`（可选，默认使用匿名邮箱）

3. **内容-评论关联**
   - 使用数组索引自动关联内容和评论
   - 第一个内容对应第一组评论，以此类推

4. **错误处理**
   - 某条评论导入失败不会影响其他评论
   - 控制台会记录失败的评论错误

### 使用步骤

1. 准备JSON数据（包含comments字段）
2. 访问管理后台 → 小红书同步 → JSON批量导入
3. 粘贴JSON数据
4. 点击"批量导入"按钮
5. 查看导入结果

### 注意事项

- 如果不需要导入评论，可以省略 `comments` 字段
- `imageUrls` 和 `imageUrl` 都支持，系统会自动选择
- `author` 和 `authorAvatar` 为可选项，不填写会使用默认显示
- `categoryId` 需要在系统中已存在，否则内容会没有分类

### API响应示例

```json
{
  "success": true,
  "count": 1,
  "failed": 0,
  "errors": []
}
```
