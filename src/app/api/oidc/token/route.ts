import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// JWT署名用の秘密鍵（本番環境では環境変数から取得）
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * OIDCトークンエンドポイント
 * 認可コードをアクセストークンとIDトークンに交換する
 * OAuth 2.0 Authorization Code Flowの重要な部分
 */
export async function POST(request: NextRequest) {
  try {
    // フォームデータからトークンリクエストパラメータを取得
    const body = await request.formData();
    const grant_type = body.get('grant_type');           // グラントタイプ（authorization_code）
    const code = body.get('code');                       // 認可コード
    const client_id = body.get('client_id');             // クライアントID
    const client_secret = body.get('client_secret');     // クライアントシークレット
    const redirect_uri = body.get('redirect_uri');       // リダイレクトURI
    
    // グラントタイプの検証（現在はauthorization_codeのみ対応）
    if (grant_type !== 'authorization_code') {
      return NextResponse.json({ error: 'unsupported_grant_type' }, { status: 400 });
    }
    
    // 必須パラメータの存在チェック
    if (!code || !client_id || !client_secret || !redirect_uri) {
      return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
    }
    
    // クライアント認証（クライアントIDとシークレットの検証）
    if (client_id !== 'test-client' || client_secret !== 'test-secret') {
      return NextResponse.json({ error: 'invalid_client' }, { status: 401 });
    }
    
    // 認可コードの検証（実際の実装では、データベースで検証）
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'invalid_grant' }, { status: 400 });
    }
    
    // アクセストークンの生成（JWT形式）
    const accessToken = jwt.sign(
      {
        sub: 'test-user',                    // ユーザー識別子
        client_id: client_id,                // クライアントID
        scope: 'openid profile email',       // 許可されたスコープ
        iat: Math.floor(Date.now() / 1000),  // 発行時刻
        exp: Math.floor(Date.now() / 1000) + 3600, // 有効期限（1時間）
      },
      JWT_SECRET,
      { algorithm: 'HS256' }
    );
    
    // IDトークンの生成（OpenID Connect標準）
    const idToken = jwt.sign(
      {
        iss: process.env.OIDC_ISSUER || 'http://localhost:3000', // 発行者
        sub: 'test-user',                    // ユーザー識別子
        aud: client_id,                      // 対象クライアント
        iat: Math.floor(Date.now() / 1000),  // 発行時刻
        exp: Math.floor(Date.now() / 1000) + 3600, // 有効期限（1時間）
        name: 'Test User',                   // ユーザー名
        email: 'test@example.com',           // メールアドレス
        email_verified: true,                // メール認証済み
      },
      JWT_SECRET,
      { algorithm: 'HS256' }
    );
    
    // トークンレスポンス（OAuth 2.0標準形式）
    const response = {
      access_token: accessToken,    // アクセストークン
      token_type: 'Bearer',         // トークンタイプ
      expires_in: 3600,            // 有効期限（秒）
      id_token: idToken,           // IDトークン（OpenID Connect）
      scope: 'openid profile email', // 許可されたスコープ
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('トークンエンドポイントエラー:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
} 