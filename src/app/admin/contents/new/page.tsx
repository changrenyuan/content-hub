'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContentForm from '@/components/admin/ContentForm';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { Category } from '@/types';

export default function NewContentPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/verify');
        const data = await response.json();
        const authenticated = data.authenticated;
        setIsAuthenticated(authenticated);

        if (authenticated) {
          await fetchCategories();
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
      } finally {
        setLoading(false);
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

  return (
    <div className="min-h-screen">
      <ContentForm
        categories={categories}
        onSuccess={() => router.push('/admin/contents')}
        onCancel={() => router.push('/admin/contents')}
      />
    </div>
  );
}