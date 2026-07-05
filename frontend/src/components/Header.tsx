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
              <Link to="/" className="text-gray-700 hover:text-green-600">
                単語一覧
              </Link>
            </li>
            <li>
              <Link to="/test" className="text-gray-700 hover:text-green-600">
                単語テスト
              </Link>
            </li>
            <li>
              <Link to="/admin/words" className="text-gray-700 hover:text-green-600">
                管理
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <button type="button" onClick={handleLogout} className="text-gray-700 hover:text-green-600">
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
