'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ContentForm from '@/components/admin/ContentForm';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { Category, ContentFormData } from '@/types';

export default function EditContentPage() {
  const router = useRouter();
  const params = useParams();
  const contentId = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [initialData, setInitialData] = useState<Partial<ContentFormData>>({});
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/verify');
        const data = await response.json();
        const authenticated = data.authenticated;
        setIsAuthenticated(authenticated);

        if (authenticated) {
          await Promise.all([
            fetchCategories(),
            fetchContent()
          ]);
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

    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/admin/contents/${contentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const contentData = await response.json();
        setInitialData(contentData);
      } catch (error) {
        console.error('Failed to fetch content:', error);
        setError('加载内容失败');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [contentId]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E86A5A] mx-auto"></div>
          <p className="mt-2 text-[#9A9A9A]">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin/contents')}
            className="text-[#E86A5A] hover:underline"
          >
            返回内容列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ContentForm
        categories={categories}
        initialData={{ ...initialData, id: contentId }}
        isEditing={true}
        onSuccess={() => router.push('/admin/contents')}
        onCancel={() => router.push('/admin/contents')}
      />
    </div>
  );
}
