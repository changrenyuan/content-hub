'use client';

import { useEffect, useState } from 'react';
import { X, Heart, Share2, Bookmark, Send, Eye } from 'lucide-react';
import { getImageUrl } from '@/lib/imageUtils';

interface ContentDetailModalProps {
  contentId: string;
  isOpen: boolean;
  onClose: () => void;
}

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

export function ContentDetailModal({
  contentId,
  isOpen,
  onClose
}: ContentDetailModalProps) {
  const [content, setContent] = useState<Content | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!isOpen || !contentId) return;

    async function fetchData() {
      try {
        setLoading(true);

        // 获取内容详情
        const contentRes = await fetch(`/api/contents/${contentId}`);
        if (contentRes.ok) {
          const contentData = await contentRes.json();
          setContent(contentData);
          setCurrentImageIndex(0); // 重置图片索引
        }

        // 获取评论
        const commentsRes = await fetch(`/api/comments?contentId=${contentId}`);
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData);
        }
      } catch (error) {
        console.error('Failed to fetch content details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isOpen, contentId]);

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(47, 47, 47, 0.4)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl w-full max-w-6xl overflow-hidden flex max-h-[90vh]"
        style={{ boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}
        >
          <X className="w-5 h-5 text-[#6B6B6B]" />
        </button>

        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : content ? (
          <>
            {/* Left Side - Image Gallery */}
            <div className="w-3/5 bg-[#FAF7F2] flex items-center justify-center p-8 relative">
              {/* 图片数组：优先使用imageUrls，没有则使用imageUrl */}
              {(() => {
                const images = Array.isArray(content.imageUrls) && content.imageUrls.length > 0
                  ? content.imageUrls.map(getImageUrl)
                  : (content.imageUrl ? [getImageUrl(content.imageUrl)] : []);

                if (images.length === 0 || (images.length === 1 && !images[0])) {
                  return (
                    <div className="aspect-square bg-gradient-to-br from-[#F4DADA] to-[#F2C94C33] rounded-2xl flex items-center justify-center">
                      <span className="text-9xl text-[#EDE6DC] font-bold">
                        {content.title.charAt(0)}
                      </span>
                    </div>
                  );
                }

                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* 当前图片 */}
                    {imageError || !images[currentImageIndex] ? (
                      <div className="aspect-square bg-gradient-to-br from-[#F4DADA] to-[#F2C94C33] rounded-2xl flex items-center justify-center">
                        <span className="text-9xl text-[#EDE6DC] font-bold">
                          {content.title.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={images[currentImageIndex] || ''}
                        alt={`${content.title} - 图片 ${currentImageIndex + 1}`}
                        className="max-w-full max-h-[85vh] object-contain rounded-xl"
                        style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)' }}
                        onError={() => setImageError(true)}
                        onLoad={() => setImageError(false)}
                      />
                    )}

                    {/* 上一张按钮 */}
                    {images.length > 1 && (
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                        style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    )}

                    {/* 下一张按钮 */}
                    {images.length > 1 && (
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                        style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
                          />
                        ))}
                      </div>
                    )}

                    {/* 图片计数 */}
                    {images.length > 1 && (
                      <div className="absolute top-6 left-6 bg-[#2F2F2F]/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Right Side - Content & Comments */}
            <div className="w-2/5 overflow-y-auto max-h-[85vh]">
              <div className="p-6">
                {/* Header - Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getImageUrl(content.authorAvatar) ? (
                      <img
                        src={getImageUrl(content.authorAvatar) || ''}
                        alt={content.author || '作者'}
                        className="w-10 h-10 rounded-full object-cover"
                        style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#EDE6DC] flex items-center justify-center text-[#2F2F2F] font-semibold">
                        {content.author?.charAt(0) || '管'}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-[#2F2F2F]">
                        {content.author || '管理员'}
                      </div>
                      <div className="text-xs text-[#9A9A9A]">
                        {new Date(content.createdAt).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  {content.category && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#EDE6DC] text-[#2F2F2F]">
                      {content.category.name}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-[#2F2F2F] mb-3">
                    {content.title}
                  </h2>
                  {content.description && (
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mb-2">
                      {content.description}
                    </p>
                  )}
                  {content.content && (
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">
                      {content.content}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-[#9A9A9A] mb-8 pb-8 border-b border-[#EDE6DC]">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>{content.viewCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4" />
                    <span>{content.likeCount}</span>
                  </div>
                  <span>
                    {new Date(content.createdAt).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                {/* Comments Section */}
                <div>
                  <h3 className="font-medium text-[#2F2F2F] mb-4">
                    评论 {comments.length > 0 && `(${comments.length})`}
                  </h3>

                  {comments.length === 0 ? (
                    <div className="text-center py-8 text-[#9A9A9A] text-sm">
                      还没有评论，来说点什么吧
                    </div>
                  ) : (
                    <div className="space-y-4 mb-8">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#EDE6DC] flex items-center justify-center text-[#2F2F2F] text-xs font-semibold flex-shrink-0">
                            {comment.authorName?.charAt(0) || '客'}
                          </div>
                          <div className="flex-1">
                            <div className="mb-1">
                              <span className="text-sm font-medium text-[#2F2F2F]">
                                {comment.authorName || '访客'}
                              </span>
                              <span className="text-xs text-[#9A9A9A] ml-2">
                                {new Date(comment.createdAt).toLocaleDateString('zh-CN', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-[#6B6B6B] leading-relaxed">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar - Fixed at bottom */}
              <div className="sticky bottom-0 bg-white border-t border-[#EDE6DC] p-6">
                {/* Quick Actions */}
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isLiked
                        ? 'text-[#2F2F2F] bg-[#EDE6DC]'
                        : 'text-[#9A9A9A] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                    />
                    <span>喜欢</span>
                  </button>

                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isBookmarked
                        ? 'text-[#2F2F2F] bg-[#EDE6DC]'
                        : 'text-[#9A9A9A] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`}
                    />
                    <span>收藏</span>
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#9A9A9A] hover:bg-[#FAF7F2] transition-all">
                    <Share2 className="w-4 h-4" />
                    <span>分享</span>
                  </button>
                </div>

                {/* Comment Input */}
                <form onSubmit={handleSubmitComment} className="relative">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="说点什么..."
                    className="w-full px-4 py-3 pr-12 bg-[#FAF7F2] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#EDE6DC] focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#2F2F2F] text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#86868B]">
            内容不存在
          </div>
        )}
      </div>
    </div>
  );
}
