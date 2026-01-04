'use client';

import { useState } from 'react';
import { Download, Loader2, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';

export default function ImageUploadTestPage() {
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    originalUrl?: string;
    blobUrl?: string;
  } | null>(null);

  const handleTestUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test/image-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: '图片上传成功！可以在 Vercel Blob Dashboard 中查看',
          originalUrl: data.originalUrl,
          blobUrl: data.blobUrl,
        });
      } else {
        setResult({
          success: false,
          message: data.error || '上传失败',
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <ImageIcon className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Blob 图片上传测试
          </h1>
          <p className="text-gray-600">
            测试从外部 URL 下载图片并上传到 Vercel Blob Storage 的功能
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">测试说明</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 输入任意图片 URL（支持 Unsplash、自建服务等）</li>
                <li>• 点击"测试上传"按钮，系统会下载并上传到 Blob</li>
                <li>• 上传成功后，可以在 Vercel Blob Dashboard 中查看</li>
                <li>• 支持 JPEG, PNG, GIF, WebP 格式</li>
                <li>• 单张图片最大 4MB</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Test Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <form onSubmit={handleTestUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                图片 URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                示例：Unsplash, Imgur, 或其他公开图片链接
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  上传中...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  测试上传
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result */}
        {result && (
          <div
            className={`rounded-xl p-6 ${
              result.success
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    result.success ? 'text-green-900' : 'text-red-900'
                  } mb-2`}
                >
                  {result.success ? '上传成功' : '上传失败'}
                </h3>
                <p
                  className={`text-sm ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {result.message}
                </p>

                {result.success && result.blobUrl && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        原始 URL
                      </label>
                      <code className="block p-2 bg-white rounded border text-xs break-all">
                        {result.originalUrl}
                      </code>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Blob URL
                      </label>
                      <code className="block p-2 bg-white rounded border text-xs break-all">
                        {result.blobUrl}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(result.blobUrl!);
                        }}
                        className="mt-2 text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        复制 Blob URL
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        预览
                      </label>
                      <img
                        src={result.blobUrl}
                        alt="Uploaded preview"
                        className="w-full max-w-md rounded-lg border"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Test URLs */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">快速测试图片</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
              'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
              'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
            ].map((url, index) => (
              <button
                key={index}
                onClick={() => setImageUrl(url)}
                className="text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
              >
                <div className="font-medium text-gray-700">测试图片 {index + 1}</div>
                <div className="text-gray-500 truncate">{url}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Blob Dashboard Link */}
        <div className="mt-6 text-center">
          <a
            href="https://vercel.com/changrenyuans-projects/~/stores/blob/store_ARCgRQhBdEfpPOB0/browser"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            打开 Vercel Blob Dashboard
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
