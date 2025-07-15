'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * OIDC認証ログインページ
 * ユーザー認証を行い、認可コードを生成してクライアントにリダイレクトする
 * OAuth 2.0 Authorization Code Flowの重要な部分
 */
export default function LoginPage() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // URLパラメータからOAuth 2.0認証リクエスト情報を取得
  const client_id = searchParams.get('client_id');        // クライアントID
  const redirect_uri = searchParams.get('redirect_uri');  // リダイレクトURI
  const response_type = searchParams.get('response_type'); // レスポンスタイプ
  const scope = searchParams.get('scope');                // 要求スコープ
  const state = searchParams.get('state');                // CSRF対策用の状態値
  
  /**
   * ログインフォーム送信時の処理
   * ユーザー認証を行い、成功時は認可コードを生成してリダイレクト
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // デモ用の簡易認証（実際の実装では、データベースでユーザー認証を行う）
    if (username === 'test' && password === 'test') {
      // 認証成功後、認可コードを生成してクライアントにリダイレクト
      const code = generateAuthorizationCode();
      const redirectUrl = new URL(redirect_uri || '');
      redirectUrl.searchParams.set('code', code);  // 認可コードを設定
      if (state) redirectUrl.searchParams.set('state', state); // 状態値を復元
      
      // クライアントのリダイレクトURIに認可コードと共にリダイレクト
      window.location.href = redirectUrl.toString();
    } else {
      alert('認証情報が無効です。ユーザー名: test、パスワード: test を使用してください。');
    }
  };
  
  /**
   * 認可コードを生成する
   * 実際の実装では、セキュアな認可コードを生成し、データベースに保存する
   */
  const generateAuthorizationCode = () => {
    // デモ用の簡易的な認可コード生成
    // 本番環境では、暗号学的に安全な乱数生成器を使用すべき
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };
  
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
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
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