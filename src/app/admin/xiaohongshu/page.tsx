'use client';

import { useState, useEffect } from 'react';
import { Download, Link2, FileJson, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { Category } from '@/types';

type SyncMethod = 'link' | 'json' | 'manual';

export default function XiaohongshuSyncPage() {
  const [syncMethod, setSyncMethod] = useState<SyncMethod>('link');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/verify');
        const data = await response.json();
        setIsAuthenticated(data.authenticated);

        if (data.authenticated) {
          fetchCategories();
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories?includeInactive=false');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E86A5A]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Link import
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');

  // JSON import
  const [jsonContent, setJsonContent] = useState('');
  const [autoSaveImages, setAutoSaveImages] = useState(true); // 默认启用自动保存图片

  // Manual import
  const [manualData, setManualData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    tags: '',
    categoryId: '',
  });

  const handleUrlImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !category) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/sync/xiaohongshu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'link',
          url,
          categoryId: category,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: '导入成功！',
          count: data.count || 1,
        });
        setUrl('');
      } else {
        setResult({
          success: false,
          message: data.error || '导入失败',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: '网络错误，请稍后重试',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJsonImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonContent) return;

    setLoading(true);
    setResult(null);

    try {
      const data = JSON.parse(jsonContent);
      const response = await fetch('/api/admin/sync/xiaohongshu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'json',
          data,
          autoSaveImages, // 传递自动保存图片选项
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: '批量导入成功！',
          count: responseData.count || 0,
        });
        setJsonContent('');
      } else {
        setResult({
          success: false,
          message: responseData.error || '导入失败',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'JSON 格式错误或网络错误',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManualImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualData.title || !manualData.categoryId) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/contents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...manualData,
          tags: manualData.tags.split(',').map(t => t.trim()).filter(t => t),
          published: true,
        }),
      });

      if (response.ok) {
        setResult({
          success: true,
          message: '内容创建成功！',
        });
        setManualData({
          title: '',
          description: '',
          content: '',
          imageUrl: '',
          tags: '',
          categoryId: '',
        });
      } else {
        const data = await response.json();
        setResult({
          success: false,
          message: data.error || '创建失败',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: '网络错误，请稍后重试',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[black] mb-2">小红书内容同步</h1>
          <p className="text-[#6B6B6B]">
            从小红书导入笔记、评论和内容到平台
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-[#F4DADA]/20 to-[#F2C94C]/20 rounded-xl p-6 mb-8" style={{ border: '2px solid var(--border-light)' }}>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#E86A5A] mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-[black] mb-1">使用说明</h3>
              <ul className="text-sm text-[#6B6B6B] space-y-1">
                <li>• <strong>链接导入：</strong>粘贴小红书笔记链接，系统会尝试抓取内容（需要配置爬虫服务）</li>
                <li>• <strong>JSON 批量导入：</strong>使用标准 JSON 格式批量导入内容，支持自动保存图片到 Blob</li>
                <li>• <strong>手动添加：</strong>手动输入小红书笔记信息</li>
                <li>• <strong>自动保存图片：</strong>开启后，外部图片 URL 会自动下载并上传到 Vercel Blob，避免防盗链和链接失效</li>
                <li>• 注意：由于小红书没有公开 API，链接导入功能需要额外配置第三方爬虫服务</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sync Method Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6" style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)', border: '1px solid var(--border-light)' }}>
          <div className="border-b" style={{ borderColor: 'var(--border-light)' }}>
            <div className="flex">
              <button
                onClick={() => setSyncMethod('link')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  syncMethod === 'link'
                    ? 'border-[#E86A5A] text-[#E86A5A]'
                    : 'border-transparent text-[#9A9A9A] hover:text-[#6B6B6B]'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Link2 className="w-4 h-4" />
                  链接导入
                </div>
              </button>
              <button
                onClick={() => setSyncMethod('json')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  syncMethod === 'json'
                    ? 'border-[#E86A5A] text-[#E86A5A]'
                    : 'border-transparent text-[#9A9A9A] hover:text-[#6B6B6B]'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FileJson className="w-4 h-4" />
                  JSON 批量导入
                </div>
              </button>
              <button
                onClick={() => setSyncMethod('manual')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  syncMethod === 'manual'
                    ? 'border-[#E86A5A] text-[#E86A5A]'
                    : 'border-transparent text-[#9A9A9A] hover:text-[#6B6B6B]'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  手动添加
                </div>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Link Import Form */}
            {syncMethod === 'link' && (
              <form onSubmit={handleUrlImport} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[black] mb-2">
                    小红书笔记链接
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.xiaohongshu.com/explore/..."
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A5A]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[black] mb-2">
                    目标分类
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A5A]"
                    required
                  >
                    <option value="">选择分类</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E86A5A] text-white py-3 rounded-lg font-medium hover:bg-[#d65a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      导入中...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      导入笔记
                    </>
                  )}
                </button>
              </form>
            )}

            {/* JSON Import Form */}
            {syncMethod === 'json' && (
              <form onSubmit={handleJsonImport} className="space-y-4">
                {/* 自动保存图片选项 */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#F4DADA]/20 to-[#F2C94C]/20 rounded-lg" style={{ border: '1px solid var(--border-light)' }}>
                  <input
                    type="checkbox"
                    id="autoSaveImages"
                    checked={autoSaveImages}
                    onChange={(e) => setAutoSaveImages(e.target.checked)}
                    className="w-4 h-4 accent-[#E86A5A]"
                  />
                  <div className="flex-1">
                    <label htmlFor="autoSaveImages" className="text-sm font-medium text-[black] cursor-pointer">
                      自动保存图片到 Blob Storage
                    </label>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">
                      系统会自动下载外部图片并上传到 Vercel Blob，避免图片防盗链和链接失效问题
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[black] mb-2">
                    JSON 数据
                  </label>
                  <textarea
                    value={jsonContent}
                    onChange={(e) => setJsonContent(e.target.value)}
                    placeholder='[{"title": "标题", "description": "描述", "imageUrls": ["图片URL1", "图片URL2"], "author": "作者名称", "authorAvatar": "头像URL", "comments": [{"content": "评论内容", "nickname": "评论者昵称"}], "categoryId": "xxx", "tags": ["tag1"]}]'
                    className="w-full h-64 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A5A] font-mono text-sm"
                    required
                  />
                  <p className="mt-2 text-xs text-[#9A9A9A]">
                    格式示例：
                    <code className="block mt-1 p-3 rounded font-mono text-xs overflow-auto" style={{ backgroundColor: 'var(--bg-main)' }}>
{`[{
  "title": "我的年度18图🫧",
  "description": "明年也要和妈妈一起拍多多的照片～",
  "imageUrls": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "author": "小红薯",
  "authorAvatar": "https://example.com/avatar.jpg",
  "categoryId": "xhs_article",
  "tags": ["年度总结", "家庭"],
  "comments": [
    {"content": "太有爱了！", "nickname": "小明"},
    {"content": "妈妈一定很开心～", "nickname": "小红"}
  ]
}]`}
                    </code>
                  </p>
                  <p className="mt-2 text-xs text-[#9A9A9A]">
                    支持字段：title, description, imageUrls, imageUrl, author, authorAvatar, tags, categoryId, comments（支持content/text, nickname/authorName）
                  </p>
                  {autoSaveImages && (
                    <p className="mt-2 text-xs text-[#E86A5A] bg-[#F4DADA]/20 p-2 rounded">
                      💡 已启用自动保存图片：外部图片 URL 将自动下载并上传到 Blob Storage
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E86A5A] text-white py-3 rounded-lg font-medium hover:bg-[#d65a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      导入中...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      批量导入
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Manual Import Form */}
            {syncMethod === 'manual' && (
              <form onSubmit={handleManualImport} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[black] mb-2">
                    标题 *
                  </label>
                  <input
                    type="text"
                    value={manualData.title}
                    onChange={(e) => setManualData({ ...manualData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A5A]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[black] mb-2">
                    描述
                  </label>
                  <textarea
                    value={manualData.description}
                    onChange={(e) => setManualData({ ...manualData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A5A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[black] mb-2">
                    详细内容
                  </label>
                  <textarea
                    value={manualData.content}
                    onChange={(e) => setManualData({ ...manualData, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A5A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[black] mb-2">
                    图片 URL
                  </label>
                  <input
                    type="url"
                    value={manualData.imageUrl}
                    onChange={(e) => setManualData({ ...manualData, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A5A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[black] mb-2">
                    标签（用逗号分隔）
                  </label>
                  <input
                    type="text"
                    value={manualData.tags}
                    onChange={(e) => setManualData({ ...manualData, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A5A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[black] mb-2">
                    目标分类 *
                  </label>
                  <select
                    value={manualData.categoryId}
                    onChange={(e) => setManualData({ ...manualData, categoryId: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E86A5A]"
                    required
                  >
                    <option value="">选择分类</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E86A5A] text-white py-3 rounded-lg font-medium hover:bg-[#d65a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      创建中...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      创建内容
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Result Banner */}
        {result && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 ${
              result.success
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <div>
              <p
                className={`font-medium ${
                  result.success ? 'text-green-900' : 'text-red-900'
                }`}
              >
                {result.message}
                {result.count !== undefined && ` (${result.count} 条内容)`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
