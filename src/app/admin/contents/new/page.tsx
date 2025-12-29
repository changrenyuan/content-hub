'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categoryManager } from '@/storage/database';
import { ContentForm } from '@/components/admin/ContentForm';
import { Category } from '@/types';

export default function NewContentPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoryManager.getCategories({ includeInactive: false });
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ContentForm 
        categories={categories}
        onSuccess={() => router.push('/admin/contents')}
        onCancel={() => router.push('/admin/contents')}
      />
    </div>
  );
}