import { NextResponse } from 'next/server';

/**
 * OIDC JWKS（JSON Web Key Set）エンドポイント
 * JWT署名検証用の公開鍵を提供する
 * クライアントがIDトークンの署名を検証する際に使用
 */
export async function GET() {
  // 注意: 実際の本番環境では、RSA鍵ペアを生成して公開鍵を返すべきです
  // このデモ実装では、HS256（対称鍵）を使用しているため、簡易的なJWKSを返します
  
  const jwks = {
    keys: [
      {
        kty: 'oct',                    // 鍵タイプ（oct = 対称鍵）
        use: 'sig',                    // 用途（sig = 署名）
        kid: 'default-key',            // 鍵識別子
        alg: 'HS256',                  // アルゴリズム（HMAC SHA-256）
        k: 'your-secret-key-base64',   // Base64エンコードされた秘密鍵
      },
    ],
  };
  
  return NextResponse.json(jwks);
} 