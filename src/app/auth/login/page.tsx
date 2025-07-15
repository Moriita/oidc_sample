'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * OIDC認証ログインページ
 * フォームsubmitでサーバーサイドAPIに直接POSTし、認証・リダイレクト
 */
export default function LoginPage() {
  const searchParams = useSearchParams();
  const [error] = useState(''); // submit時はエラー表示しない

  // URLパラメータからOAuth 2.0認証リクエスト情報を取得
  const client_id = searchParams.get('client_id');
  const redirect_uri = searchParams.get('redirect_uri');
  const response_type = searchParams.get('response_type');
  const scope = searchParams.get('scope');
  const state = searchParams.get('state');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Client: {client_id}
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          action="/api/auth/login"
          method="POST"
        >
          <input type="hidden" name="client_id" value={client_id || ''} />
          <input type="hidden" name="redirect_uri" value={redirect_uri || ''} />
          <input type="hidden" name="response_type" value={response_type || ''} />
          <input type="hidden" name="scope" value={scope || ''} />
          <input type="hidden" name="state" value={state || ''} />

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-sm text-gray-600">
            <p>Use test/test for demo login</p>
          </div>
        </form>
      </div>
    </div>
  );
} 