import { commentManager, contentManager } from "@/storage/database";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { cookies } from 'next/headers';
import Link from "next/link";
import { MessageSquare, Check, X, ArrowLeft, Trash2 } from "lucide-react";

export const dynamic = 'force-dynamic';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session?.value === 'authenticated';
}

export default async function CommentsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const resolvedParams = await searchParams;
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const showPending = resolvedParams.status === 'pending';
  const comments = showPending
    ? await commentManager.getPendingComments()
    : await commentManager.getComments({ onlyApproved: false, limit: 1000 });

  const contentMap = new Map<string, any>();
  if (comments.length > 0) {
    for (const comment of comments) {
      try {
        const content = await contentManager.getContentById(comment.contentId);
        if (content) {
          contentMap.set(content.id, content);
        }
      } catch (error) {
        console.error(`Failed to fetch content ${comment.contentId}:`, error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {showPending ? '待审核评论' : '所有评论'}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm">
          {comments.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {comments.map((comment) => {
                const content = contentMap.get(comment.contentId);
                return (
                  <div key={comment.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="font-medium text-gray-600">
                              {comment.authorName?.charAt(0) || '客'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{comment.authorName || '匿名用户'}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(comment.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        comment.isApproved
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {comment.isApproved ? '已审核' : '待审核'}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-3 pl-13">{comment.content}</p>

                    {content && (
                      <Link
                        href={`/content/${content.id}`}
                        className="text-sm text-gray-500 hover:text-gray-700 pl-13 inline-block"
                      >
                        来自: {content.title}
                      </Link>
                    )}

                    {!comment.isApproved && (
                      <div className="flex gap-2 mt-4 pl-13">
                        <form action={`/api/comments/${comment.id}/approve`} method="POST">
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                          >
                            <Check className="h-4 w-4" />
                            通过
                          </button>
                        </form>
                        <form action={`/api/comments/${comment.id}/reject`} method="POST">
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                          >
                            <X className="h-4 w-4" />
                            拒绝
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">暂无{showPending ? '待审核' : ''}评论</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
