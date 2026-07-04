import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createAdminWord } from '../api/adminWords'
import type { PartOfSpeech } from '../types/word'

const PART_OF_SPEECH_OPTIONS: PartOfSpeech[] = ['名詞', '動詞', '形容詞', '副詞', '前置詞']

function AdminWordCreate() {
  const { wordbookId } = useParams<{ wordbookId: string }>()
  const navigate = useNavigate()

  const [english, setEnglish] = useState('')
  const [japanese, setJapanese] = useState('')
  const [partOfSpeech, setPartOfSpeech] = useState<PartOfSpeech | ''>('')
  const [order, setOrder] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting || !wordbookId || !partOfSpeech) return

    setSubmitting(true)
    setSubmitError(null)

    createAdminWord({
      english,
      japanese,
      part_of_speech: partOfSpeech,
      wordbook_id: Number(wordbookId),
      order: Number(order),
    })
      .then(() => {
        navigate('/admin/words')
      })
      .catch(() => {
        setSubmitError('単語の登録に失敗しました。')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 border-b-4 border-green-500 pb-2 text-3xl font-bold text-gray-900">単語を追加</h1>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm">
          <div>
            <label htmlFor="english" className="mb-1 block text-sm font-medium text-gray-700">
              英単語
            </label>
            <input
              id="english"
              type="text"
              required
              value={english}
              onChange={(event) => setEnglish(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="japanese" className="mb-1 block text-sm font-medium text-gray-700">
              日本語
            </label>
            <input
              id="japanese"
              type="text"
              required
              value={japanese}
              onChange={(event) => setJapanese(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
            />
          </div>

          <fieldset>
            <legend className="mb-1 text-sm font-medium text-gray-700">品詞</legend>
            <div className="flex flex-wrap gap-4">
              {PART_OF_SPEECH_OPTIONS.map((option) => (
                <label key={option} className="flex items-center gap-1.5 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="part_of_speech"
                    value={option}
                    required
                    checked={partOfSpeech === option}
                    onChange={() => setPartOfSpeech(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="order" className="mb-1 block text-sm font-medium text-gray-700">
              No
            </label>
            <input
              id="order"
              type="number"
              min={1}
              required
              value={order}
              onChange={(event) => setOrder(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
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

export default AdminWordCreate
