# OpenID Connect プロバイダー

Next.jsとTypeScriptで構築されたシンプルなOpenID Connectプロバイダーです。

## 機能

- OpenID Connect 1.0準拠
- Authorization Code flow対応
- JWTベースのトークン
- ユーザー認証
- Discovery エンドポイント
- JWKS エンドポイント

## セットアップ

1. 依存関係をインストール:
```bash
npm install
```

2. ルートディレクトリに `.env.local` ファイルを作成:
```env
OIDC_ISSUER=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

3. 開発サーバーを起動:
```bash
npm run dev
```

## 設定

### クライアント設定
- **クライアントID**: `test-client`
- **クライアントシークレット**: `test-secret`
- **リダイレクトURI**: `http://localhost:3001/callback`
- **グラントタイプ**: `authorization_code`, `refresh_token`
- **レスポンスタイプ**: `code`

### デモ認証情報
- **ユーザー名**: `test`
- **パスワード**: `test`

## エンドポイント

- **Discovery**: `/.well-known/openid_configuration`
- **認証**: `/api/oidc/auth`
- **トークン**: `/api/oidc/token`
- **ユーザー情報**: `/api/oidc/userinfo`
- **JWKS**: `/api/oidc/jwks`

## テスト方法

1. `http://localhost:3000` にアクセスしてプロバイダー情報を確認
2. "Test Authorization Flow" をクリックしてOAuthフローをテスト
3. デモ認証情報（test/test）を使用して認証
4. 認可コードがリダイレクトURIに返される

## 認証フロー

1. クライアントがユーザーを `/api/oidc/auth` に必要なパラメータと共にリダイレクト
2. ユーザーが `/auth/login` にリダイレクトされて認証
3. 認証成功後、認可コードと共にユーザーがリダイレクトされる
4. クライアントが `/api/oidc/token` で認可コードをトークンに交換
5. クライアントがアクセストークンを使用して `/api/oidc/userinfo` でユーザー情報にアクセス

## セキュリティ注意事項

- これはデモ実装です
- 本番環境ではJWTシークレットを変更してください
- 適切なユーザー認証を実装してください
- 本番環境ではHTTPSを使用してください
- 適切なセッション管理を実装してください
- レート制限やその他のセキュリティ対策を追加してください

## 本番環境での考慮事項

- ユーザー管理に適切なデータベースを使用
- 適切なセッション管理を実装
- JWT署名にRSA鍵を使用
- ログとモニタリングを追加
- 適切なエラーハンドリングを実装
- レート制限を追加
- HTTPSを使用
- 適切なCORSポリシーを実装
