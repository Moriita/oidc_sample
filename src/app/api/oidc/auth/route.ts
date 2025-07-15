import { NextRequest, NextResponse } from 'next/server';

/**
 * OIDC認証エンドポイント
 * クライアントアプリケーションからの認証リクエストを処理し、
 * ユーザーを認証ページにリダイレクトする
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    
    // OAuth 2.0認証リクエストの必須パラメータを取得
    const client_id = url.searchParams.get('client_id');        // クライアントID
    const redirect_uri = url.searchParams.get('redirect_uri');  // リダイレクトURI
    const response_type = url.searchParams.get('response_type'); // レスポンスタイプ（code）
    const scope = url.searchParams.get('scope');                // 要求スコープ
    const state = url.searchParams.get('state');                // CSRF対策用の状態値
    
    // 必須パラメータの存在チェック
    if (!client_id || !redirect_uri || !response_type) {
      return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
    }
    
    // 登録済みクライアントの検証
    if (client_id !== 'test-client') {
      return NextResponse.json({ error: 'unauthorized_client' }, { status: 400 });
    }
    
    // 認証ページにリダイレクト（パラメータを引き継ぐ）
    const authUrl = new URL('/auth/login', request.url);
    authUrl.searchParams.set('client_id', client_id);
    authUrl.searchParams.set('redirect_uri', redirect_uri);
    authUrl.searchParams.set('response_type', response_type);
    if (scope) authUrl.searchParams.set('scope', scope);
    if (state) authUrl.searchParams.set('state', state);
    
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('認証エンドポイントエラー:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
} 