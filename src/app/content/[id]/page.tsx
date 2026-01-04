'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { X, Heart, Share2, Bookmark, Send, Eye, ArrowLeft } from 'lucide-react';
import { getImageUrl } from '@/lib/imageUtils';

interface Content {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  imageUrl: string | null;
  imageUrls?: string[] | null;
  sourceUrl: string | null;
  viewCount: number;
  likeCount: number;
  createdAt: Date;
  author?: string | null;
  authorAvatar?: string | null;
  category?: {
    name: string;
    color?: string;
  } | null;
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  authorName: string;
  authorEmail?: string;
}

export default function ContentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contentId = params.id as string;

  const [content, setContent] = useState<Content | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // 获取内容详情
        const contentRes = await fetch(`/api/contents/${contentId}`);
        if (contentRes.ok) {
          const contentData = await contentRes.json();
          setContent(contentData);
          setCurrentImageIndex(0); // 重置图片索引
        } else {
          router.push('/404');
          return;
        }

        // 获取评论
        const commentsRes = await fetch(`/api/comments?contentId=${contentId}`);
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData);
        }
      } catch (error) {
        console.error('Failed to fetch content details:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    }

    if (contentId) {
      fetchData();
    }
  }, [contentId, router]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !contentId) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId,
          content: newComment,
        }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments([newCommentData, ...comments]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const handleLike = async () => {
    if (!contentId) return;
    try {
      await fetch(`/api/contents/${contentId}/like`, {
        method: 'POST',
      });
      setIsLiked(!isLiked);
      if (content) {
        setContent({
          ...content,
          likeCount: content.likeCount + (isLiked ? -1 : 1),
        });
      }
    } catch (error) {
      console.error('Failed to like content:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <p className="text-[#86868B]">内容不存在</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Top Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">返回</span>
          </button>
          <h1 className="text-lg font-semibold text-[#1D1D1F]">{content.title}</h1>
          <div className="w-16" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="flex gap-8">
          {/* Left - Image Gallery */}
          <div className="w-1/2 bg-white rounded-3xl p-8 relative" style={{ boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)' }}>
            {/* 图片数组：优先使用imageUrls，没有则使用imageUrl */}
            {(() => {
              const images = Array.isArray(content.imageUrls) && content.imageUrls.length > 0
                ? content.imageUrls.map(getImageUrl)
                : (content.imageUrl ? [getImageUrl(content.imageUrl)] : []);

              if (images.length === 0 || (images.length === 1 && !images[0])) {
                return (
                  <div className="aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl flex items-center justify-center">
                    <span className="text-9xl text-zinc-300 font-bold">
                      {content.title.charAt(0)}
                    </span>
                  </div>
                );
              }

              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* 当前图片 */}
                  {imageError || !images[currentImageIndex] ? (
                    <div className="aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl flex items-center justify-center">
                      <span className="text-9xl text-zinc-300 font-bold">
                        {content.title.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={images[currentImageIndex] || ''}
                      alt={`${content.title} - 图片 ${currentImageIndex + 1}`}
                      className="max-w-full max-h-[70vh] object-contain rounded-xl"
                      style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)' }}
                      onError={() => setImageError(true)}
                      onLoad={() => setImageError(false)}
                    />
                  )}

                  {/* 上一张按钮 */}
                  {images.length > 1 && (
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}

                  {/* 下一张按钮 */}
                  {images.length > 1 && (
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                      style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}

                  {/* 图片指示器 */}
                  {images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-6'
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                        />
                      ))}
                    </div>
                  )}

                  {/* 图片计数 */}
                  {images.length > 1 && (
                    <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Right - Content & Comments */}
          <div className="w-1/2">
            <div className="bg-white rounded-3xl p-8" style={{ boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)' }}>
              {/* Header - Author Info */}
              <div className="border-b border-gray-100 pb-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getImageUrl(content.authorAvatar) ? (
                      <img
                        src={getImageUrl(content.authorAvatar) || ''}
                        alt={content.author || '作者'}
                        className="w-12 h-12 rounded-full object-cover"
                        style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                      />
                    ) : content.author ? (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center text-white font-semibold text-lg">
                        {content.author.charAt(0)}
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center text-white font-semibold text-lg">
                        账号
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-[#1D1D1F] text-lg">
                        {content.author || '管理员'}
                      </div>
                      <div className="text-sm text-[#86868B]">
                        {new Date(content.createdAt).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  {content.category && (
                    <span
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${content.category.color}15`,
                        color: content.category.color,
                      }}
                    >
                      {content.category.name}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">
                    {content.title}
                  </h2>
                  {content.description && (
                    <p className="text-[#1D1D1F] leading-relaxed mb-3 text-lg">
                      {content.description}
                    </p>
                  )}
                  {content.content && (
                    <p className="text-[#86868B] leading-relaxed">
                      {content.content}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 text-[#86868B]">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">{content.viewCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">{content.likeCount}</span>
                  </div>
                  <span className="font-medium">
                    {new Date(content.createdAt).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    isLiked
                      ? 'text-[#FE2C55] bg-red-50'
                      : 'text-[#86868B] hover:bg-gray-50'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                  />
                  <span>喜欢</span>
                </button>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    isBookmarked
                      ? 'text-[#FE2C55] bg-red-50'
                      : 'text-[#86868B] hover:bg-gray-50'
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`}
                  />
                  <span>收藏</span>
                </button>

                <button className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#86868B] hover:bg-gray-50 transition-all">
                  <Share2 className="w-5 h-5" />
                  <span>分享</span>
                </button>
              </div>

              {/* Comments Section */}
              <div>
                <h3 className="font-semibold text-[#1D1D1F] mb-6 text-lg">
                  评论 {comments.length > 0 && `(${comments.length})`}
                </h3>

                {/* Comment Input */}
                <form onSubmit={handleSubmitComment} className="mb-8">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      我
                    </div>
                    <div className="flex-1 flex gap-3">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="写下你的评论..."
                        className="flex-1 px-4 py-3 bg-zinc-50 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#007AFF] placeholder:text-zinc-300 transition-all"
                      />
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="px-6 py-3 bg-[#1D1D1F] text-white rounded-xl text-sm font-semibold hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        发送
                      </button>
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                {comments.length === 0 ? (
                  <div className="text-center py-12 bg-zinc-50 rounded-2xl">
                    <p className="text-[#86868B]">还没有评论，来说点什么吧</p>
                  </div>
                ) : (
                  <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {comment.authorName?.charAt(0) || '客'}
                        </div>
                        <div className="flex-1">
                          <div className="mb-1.5">
                            <span className="text-sm font-semibold text-[#1D1D1F]">
                              {comment.authorName || '访客'}
                            </span>
                            <span className="text-xs text-[#86868B] ml-2">
                              {new Date(comment.createdAt).toLocaleDateString('zh-CN', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <p className="text-[#86868B] leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
