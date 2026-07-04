import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAdminWordbooks } from '../api/adminWordbooks'
import type { Wordbook } from '../types/wordbook'

function AdminWordbookSelect() {
  const [wordbooks, setWordbooks] = useState<Wordbook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    setLoading(true)
    setError(null)

    fetchAdminWordbooks()
      .then((response) => {
        if (ignore) return
        setWordbooks(response.data)
      })
      .catch(() => {
        if (ignore) return
        setError('単語帳一覧の取得に失敗しました。')
      })
      .finally(() => {
        if (ignore) return
        setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 border-b-4 border-green-500 pb-2">
          <h1 className="text-3xl font-bold text-gray-900">単語帳を選択</h1>
        </div>

        {loading && <p className="text-gray-500">読み込み中...</p>}

        {!loading && error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && wordbooks.length === 0 && (
          <p className="text-gray-700">
            単語帳がありません。
            <Link to="/admin/wordbooks/add" className="text-green-600 hover:underline">
              単語帳を追加する
            </Link>
          </p>
        )}

        {!loading && !error && wordbooks.length > 0 && (
          <ul className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            {wordbooks.map((wordbook) => (
              <li key={wordbook.id}>
                <Link
                  to={`/admin/words/create-wordbook/${wordbook.id}`}
                  className="block px-4 py-3 font-medium text-gray-900 hover:bg-green-50 hover:text-green-600"
                >
                  {wordbook.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AdminWordbookSelect
