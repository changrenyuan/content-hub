'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: 'include', // Ensure cookies are included
      });

      const data = await response.json();

      if (data.success) {
        // Wait a bit for cookie to be saved, then reload
        await new Promise(resolve => setTimeout(resolve, 500));
        // Force full page reload to trigger server-side auth check
        window.location.reload();
      } else {
        setError(data.error || '登录失败');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('网络错误，请重试');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F7F7F7] flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[#F7F7F7] marble-texture flex items-center justify-center">
              <Lock className="w-10 h-10 text-[#9A9A9A]" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[black] mb-2">管理员登录</h1>
            <p className="text-[#9A9A9A] text-sm">请输入密码以访问管理后台</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[black] mb-2">
                密码
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full px-4 py-3 rounded-xl text-[black] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-[#E86A5A] transition-all"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[black] transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-[#E86A5A] text-white rounded-xl font-medium hover:bg-[#d65a4a] focus:outline-none focus:ring-2 focus:ring-[#E86A5A] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[#9A9A9A] text-sm mt-6">
          见地 IN SIGHT · 灵感策展空间
        </p>
      </div>
    </div>
  );
}
