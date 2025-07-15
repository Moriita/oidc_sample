import { NextResponse } from 'next/server';

/**
 * OpenID Connect Discovery エンドポイント
 * OIDCプロバイダーの設定情報を公開する
 * クライアントがプロバイダーの機能を自動検出する際に使用
 */
export async function GET() {
  // 発行者URL（環境変数から取得、デフォルトはlocalhost:3000）
  const issuer = process.env.OIDC_ISSUER || 'http://localhost:3000';
  
  // OpenID Connect Discovery 標準に準拠した設定情報
  const configuration = {
    issuer: issuer,                                    // 発行者URL（必須）
    authorization_endpoint: `${issuer}/api/oidc/auth`, // 認証エンドポイント
    token_endpoint: `${issuer}/api/oidc/token`,        // トークンエンドポイント
    userinfo_endpoint: `${issuer}/api/oidc/userinfo`,  // ユーザー情報エンドポイント
    jwks_uri: `${issuer}/api/oidc/jwks`,               // JWKSエンドポイント
    
    // サポートする機能
    response_types_supported: ['code'],                // サポートするレスポンスタイプ
    subject_types_supported: ['public'],               // サポートするサブジェクトタイプ
    id_token_signing_alg_values_supported: ['RS256'],  // IDトークン署名アルゴリズム
    scopes_supported: ['openid', 'profile', 'email'],  // サポートするスコープ
    token_endpoint_auth_methods_supported: ['client_secret_basic', 'client_secret_post'], // 認証方法
    
    // サポートするクレーム（ユーザー情報）
    claims_supported: [
      'sub',                    // ユーザー識別子（必須）
      'name',                   // フルネーム
      'family_name',            // 姓
      'given_name',             // 名
      'middle_name',            // ミドルネーム
      'nickname',               // ニックネーム
      'preferred_username',     // 推奨ユーザー名
      'profile',                // プロフィールURL
      'picture',                // プロフィール画像
      'website',                // ウェブサイト
      'gender',                 // 性別
      'birthdate',              // 生年月日
      'zoneinfo',               // タイムゾーン
      'locale',                 // ロケール
      'updated_at',             // 最終更新時刻
      'email',                  // メールアドレス
      'email_verified'          // メール認証済みフラグ
    ],
    
    // PKCE（Proof Key for Code Exchange）サポート
    code_challenge_methods_supported: ['S256', 'plain'],
  };

  return NextResponse.json(configuration);
} 