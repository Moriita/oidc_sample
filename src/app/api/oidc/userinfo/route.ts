import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// JWT署名用の秘密鍵（トークンエンドポイントと同じ）
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * OIDCユーザー情報エンドポイント
 * アクセストークンを使用してユーザーの詳細情報を取得する
 * OpenID Connect標準のUserInfoエンドポイント
 */
export async function GET(request: NextRequest) {
  try {
    // AuthorizationヘッダーからBearerトークンを取得
    const authHeader = request.headers.get('authorization');
    
    // Bearerトークンの形式チェック
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'invalid_token' }, { status: 401 });
    }
    
    // "Bearer "プレフィックスを除去してトークンを抽出
    const token = authHeader.substring(7);
    
    try {
      // JWTトークンの検証とデコード
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // ユーザー情報を返す（OpenID Connect標準クレーム）
      const userInfo = {
        sub: decoded.sub,                    // ユーザー識別子（必須）
        name: 'Test User',                   // フルネーム
        given_name: 'Test',                  // 名
        family_name: 'User',                 // 姓
        email: 'test@example.com',           // メールアドレス
        email_verified: true,                // メール認証済みフラグ
        updated_at: Math.floor(Date.now() / 1000), // 最終更新時刻
      };
      
      return NextResponse.json(userInfo);
    } catch (jwtError) {
      // JWT検証エラー（無効なトークン、期限切れなど）
      return NextResponse.json({ error: 'invalid_token' }, { status: 401 });
    }
  } catch (error) {
    console.error('ユーザー情報エンドポイントエラー:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

/**
 * POSTリクエストもGETと同じ処理
 * 一部のクライアントはPOSTでユーザー情報を要求する場合がある
 */
export async function POST(request: NextRequest) {
  return GET(request);
} 