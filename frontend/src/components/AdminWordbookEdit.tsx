import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchAdminWordbooks, updateAdminWordbook } from '../api/adminWordbooks'

function AdminWordbookEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [name, setName] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    let ignore = false

    setLoading(true)
    setError(null)

    fetchAdminWordbooks()
      .then((response) => {
        if (ignore) return
        const wordbook = response.data.find((item) => item.id === Number(id))
        if (!wordbook) {
          setError('単語帳が見つかりませんでした。')
          return
        }
        setName(wordbook.name)
      })
      .catch(() => {
        if (ignore) return
        setError('単語帳の取得に失敗しました。')
      })
      .finally(() => {
        if (ignore) return
        setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [id])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting || !id) return

    setSubmitting(true)
    setSubmitError(null)

    updateAdminWordbook(Number(id), { name })
      .then(() => {
        navigate('/admin/words/create-wordbook')
      })
      .catch(() => {
        setSubmitError('単語帳の更新に失敗しました。')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 border-b-4 border-green-500 pb-2">
          <Link to="/admin/words/create-wordbook" className="text-sm text-green-600 hover:underline">
            ← 単語帳一覧へ戻る
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">単語帳を編集</h1>
        </div>

        {loading && <p className="text-gray-500">読み込み中...</p>}

        {!loading && error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <label htmlFor="name" className="w-20 shrink-0 text-sm font-medium text-gray-700">
                単語帳名
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
              />
            </div>

            {submitError && (
              <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            >
              {submitting ? '更新中...' : '更新する'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AdminWordbookEdit
