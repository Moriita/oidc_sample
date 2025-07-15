/**
 * OIDCプロバイダーの簡易実装
 * 本格的なoidc-providerライブラリの代わりに、基本的な機能を手動で実装
 */
export interface OidcProvider {
  /** 発行者（Issuer）のURL */
  issuer: string;
}

// シングルトンパターンでOIDCプロバイダーインスタンスを管理
let oidcProvider: OidcProvider | null = null;

/**
 * OIDCプロバイダーのインスタンスを取得
 * 初回呼び出し時にインスタンスを作成し、以降は同じインスタンスを返す
 */
export function getOidcProvider(): OidcProvider {
  if (!oidcProvider) {
    // 環境変数から発行者URLを取得、デフォルトはlocalhost:3000
    const issuer = process.env.OIDC_ISSUER || 'http://localhost:3000';
    oidcProvider = { issuer };
  }
  return oidcProvider;
}

/**
 * 新しいOIDCプロバイダーインスタンスを作成
 * テスト用や複数インスタンスが必要な場合に使用
 */
export function createOidcProvider(): OidcProvider {
  const issuer = process.env.OIDC_ISSUER || 'http://localhost:3000';
  return { issuer };
} 