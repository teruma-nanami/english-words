import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteAdminWord, fetchAdminWords } from '../api/adminWords'
import { PART_OF_SPEECH_LABELS, type PartOfSpeech, type PaginationMeta, type Word } from '../types/word'

const PART_OF_SPEECH_BADGE_STYLES: Record<PartOfSpeech, string> = {
  名詞: 'bg-blue-100 text-blue-700',
  動詞: 'bg-green-100 text-green-700',
  形容詞: 'bg-purple-100 text-purple-700',
  副詞: 'bg-amber-100 text-amber-700',
  前置詞: 'bg-pink-100 text-pink-700',
}

function AdminWordList() {
  const [words, setWords] = useState<Word[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    setLoading(true)
    setError(null)

    fetchAdminWords(currentPage)
      .then((response) => {
        if (ignore) return
        setWords(response.data)
        setMeta(response.meta)
      })
      .catch(() => {
        if (ignore) return
        setError('単語一覧の取得に失敗しました。')
      })
      .finally(() => {
        if (ignore) return
        setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [currentPage])

  const handleDelete = (id: number) => {
    if (deletingId !== null) return
    if (!window.confirm('この単語を削除しますか？')) return

    setDeletingId(id)
    setDeleteError(null)

    deleteAdminWord(id)
      .then(() => {
        setWords((prev) => prev.filter((word) => word.id !== id))
      })
      .catch(() => {
        setDeleteError('単語の削除に失敗しました。')
      })
      .finally(() => {
        setDeletingId(null)
      })
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between border-b-4 border-green-500 pb-2">
          <h1 className="text-3xl font-bold text-gray-900">管理：単語一覧</h1>
          <Link
            to="/admin/words/create-wordbook"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            単語を追加
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

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">ID</th>
                    <th className="px-4 py-3 font-semibold">英単語</th>
                    <th className="px-4 py-3 font-semibold">日本語</th>
                    <th className="px-4 py-3 font-semibold">品詞</th>
                    <th className="px-4 py-3 font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {words.map((word) => (
                    <tr key={word.id} className="hover:bg-green-50">
                      <td className="px-4 py-3 text-gray-500">{word.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        <Link to={`/admin/words/${word.id}/edit`} className="hover:text-green-600">
                          {word.english}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        <Link to={`/admin/words/${word.id}/edit`} className="hover:text-green-600">
                          {word.japanese}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${PART_OF_SPEECH_BADGE_STYLES[word.part_of_speech]}`}
                        >
                          {PART_OF_SPEECH_LABELS[word.part_of_speech]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleDelete(word.id)}
                          disabled={deletingId === word.id}
                          className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                        >
                          {deletingId === word.id ? '削除中...' : '削除'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {meta && (
              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => page - 1)}
                  disabled={meta.current_page <= 1}
                  className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                  前へ
                </button>
                <span className="text-sm text-gray-600">
                  {meta.current_page} / {meta.last_page}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => page + 1)}
                  disabled={meta.current_page >= meta.last_page}
                  className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                  次へ
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AdminWordList
