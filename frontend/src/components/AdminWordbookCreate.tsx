import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAdminWordbook } from '../api/adminWordbooks'

function AdminWordbookCreate() {
  const navigate = useNavigate()

  const [name, setName] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    setSubmitting(true)
    setSubmitError(null)

    createAdminWordbook({ name })
      .then(() => {
        navigate('/admin/words/create-wordbook')
      })
      .catch(() => {
        setSubmitError('単語帳の登録に失敗しました。')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 border-b-4 border-green-500 pb-2 text-3xl font-bold text-gray-900">単語帳を追加</h1>

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
            {submitting ? '登録中...' : '追加する'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminWordbookCreate
