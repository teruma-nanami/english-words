import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteAdminWordbook, fetchAdminWordbooks } from '../api/adminWordbooks'
import type { Wordbook } from '../types/wordbook'

function AdminWordbookSelect() {
  const [wordbooks, setWordbooks] = useState<Wordbook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

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

  const handleDelete = (id: number) => {
    if (deletingId !== null) return
    if (!window.confirm('この単語帳を削除しますか？')) return

    setDeletingId(id)
    setDeleteError(null)

    deleteAdminWordbook(id)
      .then(() => fetchAdminWordbooks())
      .then((response) => {
        setWordbooks(response.data)
      })
      .catch(() => {
        setDeleteError('単語帳の削除に失敗しました。')
      })
      .finally(() => {
        setDeletingId(null)
      })
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between border-b-4 border-green-500 pb-2">
          <h1 className="text-3xl font-bold text-gray-900">単語帳を選択</h1>
          <Link
            to="/admin/wordbooks/add"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            単語帳を追加する
          </Link>
        </div>

        {loading && <p className="text-gray-500">読み込み中...</p>}

        {!loading && error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {deleteError && (
              <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {deleteError}
              </p>
            )}

            {wordbooks.length === 0 && <p className="text-gray-700">単語帳がありません。</p>}

            {wordbooks.length > 0 && (
              <ul className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                {wordbooks.map((wordbook) => (
                  <li key={wordbook.id} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-green-50">
                    <Link
                      to={`/admin/words/create-wordbook/${wordbook.id}`}
                      className="flex-1 font-medium text-gray-900 hover:text-green-600"
                    >
                      {wordbook.name}
                    </Link>
                    <Link
                      to={`/admin/wordbooks/${wordbook.id}/edit`}
                      className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                    >
                      編集
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(wordbook.id)}
                      disabled={deletingId === wordbook.id}
                      className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                    >
                      {deletingId === wordbook.id ? '削除中...' : '削除'}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AdminWordbookSelect
