import { Link } from 'react-router-dom'
import { getBackendOrigin, logout } from '../api/httpClient'
import { useCurrentUser } from '../hooks/useCurrentUser'

function Header() {
  const { isAuthenticated } = useCurrentUser()

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      window.location.href = `${getBackendOrigin()}/login`
    }
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold text-gray-900">
          英単語テスト
        </Link>
        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link to="/" className="text-green-600 hover:text-green-700">
                単語一覧
              </Link>
            </li>
            <li>
              <Link to="/test" className="text-green-600 hover:text-green-700">
                単語テスト
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <Link to="/admin/words/create-wordbook" className="text-green-600 hover:text-green-700">
                  単語追加
                </Link>
              ) : (
                <a
                  href={`${getBackendOrigin()}/login`}
                  className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  ログイン
                </a>
              )}
            </li>
            {isAuthenticated && (
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  ログアウト
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
