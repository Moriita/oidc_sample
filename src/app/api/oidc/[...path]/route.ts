import { NextRequest, NextResponse } from 'next/server';

/**
 * OIDC動的ルートエンドポイント
 * /api/oidc/[path] 形式のリクエストを適切なエンドポイントに振り分ける
 * フォールバック用のルーティング機能を提供
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // URLパスを結合してエンドポイントを特定
    const path = params.path.join('/');
    
    // パスに基づいて適切なエンドポイントにリダイレクト
    switch (path) {
      case 'auth':
        // 認証エンドポイントへのリダイレクト
        return NextResponse.redirect(new URL('/api/oidc/auth', request.url));
      case 'token':
        // トークンエンドポイントはPOSTのみ対応
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
      case 'userinfo':
        // ユーザー情報エンドポイントへのリダイレクト
        return NextResponse.redirect(new URL('/api/oidc/userinfo', request.url));
      case 'jwks':
        // JWKSエンドポイントへのリダイレクト
        return NextResponse.redirect(new URL('/api/oidc/jwks', request.url));
      default:
        // 不明なパスの場合は404エラー
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('OIDC動的ルートGETエラー:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POSTリクエストの動的ルーティング
 * 主にトークンエンドポイントとユーザー情報エンドポイントで使用
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    
    // POSTリクエストに対応するエンドポイントへの振り分け
    switch (path) {
      case 'token':
        // トークンエンドポイントへのリダイレクト
        return NextResponse.redirect(new URL('/api/oidc/token', request.url));
      case 'userinfo':
        // ユーザー情報エンドポイントへのリダイレクト
        return NextResponse.redirect(new URL('/api/oidc/userinfo', request.url));
      default:
        // 不明なパスの場合は404エラー
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('OIDC動的ルートPOSTエラー:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 