'use client';

import { useEffect, useState } from 'react';

export default function TestLoginPage() {
  const [cookies, setCookies] = useState('');

  useEffect(() => {
    // Try to get all cookies
    setCookies(document.cookie);

    // Test login API
    const testLogin = async () => {
      console.log('Testing login...');

      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: '000000' }),
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers.get('set-cookie'));

      const data = await response.json();
      console.log('Response data:', data);

      // Check cookies after login
      setTimeout(() => {
        console.log('Cookies after login:', document.cookie);
        setCookies(document.cookie);
      }, 100);
    };

    testLogin();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Login Test</h1>
      <div className="bg-white p-4 rounded-lg">
        <p className="mb-2"><strong>Current Cookies:</strong></p>
        <pre className="bg-gray-100 p-2 rounded overflow-auto">
          {cookies || 'No cookies'}
        </pre>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg mt-4">
        <p className="text-sm text-blue-800">
          Check the browser console for detailed debug information
        </p>
      </div>
      <div className="mt-4">
        <a href="/admin" className="text-blue-600 underline">
          Go to Admin Page
        </a>
      </div>
    </div>
  );
}
