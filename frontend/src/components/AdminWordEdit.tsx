import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteAdminWord, fetchAdminWord, updateAdminWord } from '../api/adminWords'
import { PART_OF_SPEECH_BADGE_STYLES, type PartOfSpeech } from '../types/word'

const PART_OF_SPEECH_OPTIONS: PartOfSpeech[] = ['名詞', '動詞', '形容詞', '副詞', '前置詞']

function AdminWordEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [english, setEnglish] = useState('')
  const [japanese, setJapanese] = useState('')
  const [partOfSpeech, setPartOfSpeech] = useState<PartOfSpeech | ''>('')
  const [order, setOrder] = useState<number | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    let ignore = false

    setLoading(true)
    setError(null)

    fetchAdminWord(Number(id))
      .then((word) => {
        if (ignore) return
        setEnglish(word.english)
        setJapanese(word.japanese)
        setPartOfSpeech(word.part_of_speech)
        setOrder(word.order)
      })
      .catch(() => {
        if (ignore) return
        setError('単語の取得に失敗しました。')
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
    if (submitting || !id || !partOfSpeech) return

    setSubmitting(true)
    setSubmitError(null)

    updateAdminWord(Number(id), {
      english,
      japanese,
      part_of_speech: partOfSpeech,
    })
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setSubmitError('単語の更新に失敗しました。')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handleDelete = () => {
    if (deleting || !id) return
    if (!window.confirm('この単語を削除しますか？')) return

    setDeleting(true)
    setDeleteError(null)

    deleteAdminWord(Number(id))
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setDeleteError('単語の削除に失敗しました。')
      })
      .finally(() => {
        setDeleting(false)
      })
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 border-b-4 border-green-500 pb-2">
          <Link to="/" className="text-sm text-green-600 hover:underline">
            ← 単語一覧へ戻る
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">単語を編集</h1>
        </div>

        {loading && <p className="text-gray-500">読み込み中...</p>}

        {!loading && error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <label htmlFor="english" className="w-20 shrink-0 text-sm font-medium text-gray-700">
                英単語
              </label>
              <input
                id="english"
                type="text"
                required
                value={english}
                onChange={(event) => setEnglish(event.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="japanese" className="w-20 shrink-0 text-sm font-medium text-gray-700">
                日本語
              </label>
              <input
                id="japanese"
                type="text"
                required
                value={japanese}
                onChange={(event) => setJapanese(event.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
              />
            </div>

            <div className="flex items-start gap-3">
              <span id="part-of-speech-label" className="w-20 shrink-0 pt-1 text-sm font-medium text-gray-700">
                品詞
              </span>
              <fieldset
                aria-labelledby="part-of-speech-label"
                className="m-0 min-w-0 flex flex-1 flex-wrap gap-2 border-0 p-0"
              >
                {PART_OF_SPEECH_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer rounded-full px-3 py-1 text-sm font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-green-500 has-[:focus-visible]:ring-offset-1 ${
                      partOfSpeech === option ? PART_OF_SPEECH_BADGE_STYLES[option] : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="part_of_speech"
                      value={option}
                      required
                      checked={partOfSpeech === option}
                      onChange={() => setPartOfSpeech(option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </fieldset>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-sm font-medium text-gray-700">No</span>
              <span className="text-sm text-gray-900">{order ?? '-'}</span>
            </div>

            <p className="text-sm text-gray-500">Noを変更したい場合は、単語を削除してから登録し直してください。</p>

            {submitError && (
              <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {submitError}
              </p>
            )}

            {deleteError && (
              <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {deleteError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
              >
                {submitting ? '更新中...' : '更新する'}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-md border-2 border-red-500 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
              >
                {deleting ? '削除中...' : '削除'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default AdminWordEdit
