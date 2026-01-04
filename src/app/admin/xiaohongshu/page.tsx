'use client';

import { useState } from 'react';
import { Download, Link2, FileJson, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

type SyncMethod = 'link' | 'json' | 'manual';

export default function XiaohongshuSyncPage() {
  const [syncMethod, setSyncMethod] = useState<SyncMethod>('link');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);

  // Link import
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');

  // JSON import
  const [jsonContent, setJsonContent] = useState('');

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">小红书内容同步</h1>
          <p className="text-gray-600">
            从小红书导入笔记、评论和内容到平台
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-1">使用说明</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>链接导入：</strong>粘贴小红书笔记链接，系统会尝试抓取内容（需要配置爬虫服务）</li>
                <li>• <strong>JSON 批量导入：</strong>使用标准 JSON 格式批量导入内容</li>
                <li>• <strong>手动添加：</strong>手动输入小红书笔记信息</li>
                <li>• 注意：由于小红书没有公开 API，链接导入功能需要额外配置第三方爬虫服务</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sync Method Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSyncMethod('link')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  syncMethod === 'link'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
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
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
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
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    小红书笔记链接
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.xiaohongshu.com/explore/..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    目标分类
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">选择分类</option>
                    <option value="tools">工具推荐</option>
                    <option value="development">开发资源</option>
                    <option value="videos">视频教程</option>
                    <option value="design">设计灵感</option>
                    <option value="articles">阅读文章</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    JSON 数据
                  </label>
                  <textarea
                    value={jsonContent}
                    onChange={(e) => setJsonContent(e.target.value)}
                    placeholder='[{"title": "标题", "description": "描述", "imageUrl": "图片URL", "categoryId": "xxx", "tags": ["tag1"]}]'
                    className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    required
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    格式示例：
                    <code className="block mt-1 font-mono">
                      [{`{"title": "标题", "description": "描述", "imageUrl": "图片URL", "categoryId": "xxx", "tags": ["tag1"]}`}]
                    </code>
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    标题 *
                  </label>
                  <input
                    type="text"
                    value={manualData.title}
                    onChange={(e) => setManualData({ ...manualData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    描述
                  </label>
                  <textarea
                    value={manualData.description}
                    onChange={(e) => setManualData({ ...manualData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    详细内容
                  </label>
                  <textarea
                    value={manualData.content}
                    onChange={(e) => setManualData({ ...manualData, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    图片 URL
                  </label>
                  <input
                    type="url"
                    value={manualData.imageUrl}
                    onChange={(e) => setManualData({ ...manualData, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    标签（用逗号分隔）
                  </label>
                  <input
                    type="text"
                    value={manualData.tags}
                    onChange={(e) => setManualData({ ...manualData, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    目标分类 *
                  </label>
                  <select
                    value={manualData.categoryId}
                    onChange={(e) => setManualData({ ...manualData, categoryId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">选择分类</option>
                    <option value="tools">工具推荐</option>
                    <option value="development">开发资源</option>
                    <option value="videos">视频教程</option>
                    <option value="design">设计灵感</option>
                    <option value="articles">阅读文章</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
