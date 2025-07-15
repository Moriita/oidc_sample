import { NextRequest, NextResponse } from 'next/server';

/**
 * サーバーサイド認証API
 * POST: ユーザー名・パスワードを受け取り、認証・認可コード生成・リダイレクト
 */
export async function POST(request: NextRequest) {
  try {
    let username, password, client_id, redirect_uri, response_type, scope, state;
    // Content-Typeによって取得方法を分岐
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      username = body.username;
      password = body.password;
      client_id = body.client_id;
      redirect_uri = body.redirect_uri;
      response_type = body.response_type;
      scope = body.scope;
      state = body.state;
    } else {
      const form = await request.formData();
      username = form.get('username');
      password = form.get('password');
      client_id = form.get('client_id');
      redirect_uri = form.get('redirect_uri');
      response_type = form.get('response_type');
      scope = form.get('scope');
      state = form.get('state');
    }

    // デモ用認証（本番はDB等で認証）
    if (username === 'test' && password === 'test') {
      // 認可コード生成（本番はDB保存推奨）
      const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      // リダイレクト先URL生成
      const url = new URL(redirect_uri);
      url.searchParams.set('code', code);
      if (state) url.searchParams.set('state', state);
      // 302リダイレクトレスポンスを返す
      return NextResponse.redirect(url.toString(), 302);
    } else {
      // 認証失敗時は簡易的なエラーページを返す
      return new NextResponse('<html><body><h1>認証失敗</h1><p>ユーザー名またはパスワードが間違っています。</p><a href="/auth/login">戻る</a></body></html>', {
        status: 401,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
  } catch (error) {
    return new NextResponse('<html><body><h1>サーバーエラー</h1></body></html>', {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
} 