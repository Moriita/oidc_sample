import Link from 'next/link';

/**
 * OIDCプロバイダーのメインページ
 * プロバイダー情報の表示とテスト用リンクを提供
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            OpenID Connect Provider
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Next.jsとTypeScriptで構築されたシンプルなOIDCプロバイダー
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Provider Information
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Issuer:</strong> http://localhost:3000</p>
              <p><strong>Client ID:</strong> test-client</p>
              <p><strong>Client Secret:</strong> test-secret</p>
              <p><strong>Redirect URI:</strong> http://localhost:3001/callback</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Endpoints
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Discovery:</strong> /.well-known/openid_configuration</p>
              <p><strong>Authorization:</strong> /api/oidc/auth</p>
              <p><strong>Token:</strong> /api/oidc/token</p>
              <p><strong>UserInfo:</strong> /api/oidc/userinfo</p>
              <p><strong>JWKS:</strong> /api/oidc/jwks</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Test Links
          </h2>
          <div className="space-y-4">
            <div>
              <Link 
                href="/.well-known/openid_configuration"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View OpenID Configuration
              </Link>
            </div>
            <div>
              <Link 
                href="/api/oidc/jwks"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View JWKS
              </Link>
            </div>
            <div>
              <a 
                href="/api/oidc/auth?client_id=test-client&redirect_uri=http://localhost:3001/callback&response_type=code&scope=openid%20profile%20email&state=test-state"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Test Authorization Flow
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Demo Credentials
          </h3>
          <p className="text-yellow-700">
            Username: <strong>test</strong> | Password: <strong>test</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
