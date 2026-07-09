import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchWordbooks } from '../api/wordbooks'
import { fetchWords } from '../api/words'
import { useCurrentUser } from '../hooks/useCurrentUser'
import {
  PART_OF_SPEECH_BADGE_STYLES,
  PART_OF_SPEECH_LABELS,
  type PaginationMeta,
  type PartOfSpeech,
  type Word,
} from '../types/word'
import type { Wordbook } from '../types/wordbook'

const PART_OF_SPEECH_OPTIONS: PartOfSpeech[] = ['名詞', '動詞', '形容詞', '副詞', '前置詞']

function WordList() {
  const { isAuthenticated } = useCurrentUser()
  const navigate = useNavigate()
  const [words, setWords] = useState<Word[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [partOfSpeech, setPartOfSpeech] = useState<PartOfSpeech | ''>('')
  const [wordbookId, setWordbookId] = useState<number | ''>('')
  const [wordbooks, setWordbooks] = useState<Wordbook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchWordbooks()
      .then((response) => setWordbooks(response.data))
      .catch(() => {
        // 絞り込み選択肢の取得失敗は一覧表示自体を妨げないため無視する
      })
  }, [])

  useEffect(() => {
    let ignore = false

    setLoading(true)
    setError(null)

    fetchWords(currentPage, partOfSpeech || undefined, wordbookId || undefined)
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
  }, [currentPage, partOfSpeech, wordbookId])

  const handlePartOfSpeechChange = (value: string) => {
    setPartOfSpeech(value as PartOfSpeech | '')
    setCurrentPage(1)
  }

  const handleWordbookChange = (value: string) => {
    setWordbookId(value ? Number(value) : '')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 border-b-4 border-green-500 pb-2 text-3xl font-bold text-gray-900">単語一覧</h1>

        <div className="mb-6 flex flex-wrap gap-4">
          <div>
            <label htmlFor="part_of_speech_filter" className="mb-1 block text-sm font-medium text-gray-700">
              品詞で絞り込み
            </label>
            <select
              id="part_of_speech_filter"
              value={partOfSpeech}
              onChange={(event) => handlePartOfSpeechChange(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
            >
              <option value="">すべて</option>
              {PART_OF_SPEECH_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="wordbook_filter" className="mb-1 block text-sm font-medium text-gray-700">
              単語帳で絞り込み
            </label>
            <select
              id="wordbook_filter"
              value={wordbookId}
              onChange={(event) => handleWordbookChange(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
            >
              <option value="">すべて</option>
              {wordbooks.map((wordbook) => (
                <option key={wordbook.id} value={wordbook.id}>
                  {wordbook.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <p className="text-gray-500">読み込み中...</p>}

        {!loading && error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">No</th>
                    <th className="px-4 py-3 font-semibold">英単語</th>
                    <th className="px-4 py-3 font-semibold">日本語</th>
                    <th className="px-4 py-3 font-semibold">品詞</th>
                    <th className="px-4 py-3 font-semibold">単語帳</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {words.map((word) => (
                    <tr
                      key={word.id}
                      onClick={isAuthenticated ? () => navigate(`/admin/words/${word.id}/edit`) : undefined}
                      onKeyDown={
                        isAuthenticated
                          ? (event) => {
                              if (event.key !== 'Enter' && event.key !== ' ') return
                              event.preventDefault()
                              navigate(`/admin/words/${word.id}/edit`)
                            }
                          : undefined
                      }
                      tabIndex={isAuthenticated ? 0 : undefined}
                      role={isAuthenticated ? 'link' : undefined}
                      aria-label={isAuthenticated ? `${word.english}を編集` : undefined}
                      className={`hover:bg-green-50 ${
                        isAuthenticated
                          ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500'
                          : ''
                      }`}
                    >
                      <td className="px-4 py-3 text-gray-500">{word.order ?? '-'}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{word.english}</td>
                      <td className="px-4 py-3 text-gray-700">{word.japanese}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${PART_OF_SPEECH_BADGE_STYLES[word.part_of_speech]}`}
                        >
                          {PART_OF_SPEECH_LABELS[word.part_of_speech]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{word.wordbook_name ?? '-'}</td>
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

export default WordList
