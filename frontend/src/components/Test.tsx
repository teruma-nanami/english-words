import { useEffect, useState, type FormEvent } from 'react'
import { fetchTest } from '../api/test'
import { fetchWordbooks } from '../api/wordbooks'
import type { TestMode } from '../types/test'
import type { Word } from '../types/word'
import type { Wordbook } from '../types/wordbook'

type Phase = 'form' | 'quiz' | 'result'

function Test() {
  const [wordbooks, setWordbooks] = useState<Wordbook[]>([])
  const [wordbooksLoading, setWordbooksLoading] = useState(true)
  const [wordbooksError, setWordbooksError] = useState<string | null>(null)

  const [selectedWordbookId, setSelectedWordbookId] = useState<number | null>(null)
  const [questionCount, setQuestionCount] = useState(20)
  const [mode, setMode] = useState<TestMode>('random')

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [phase, setPhase] = useState<Phase>('form')
  const [testWordbook, setTestWordbook] = useState<Wordbook | null>(null)
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [understoodCount, setUnderstoodCount] = useState(0)
  const [notUnderstoodCount, setNotUnderstoodCount] = useState(0)

  useEffect(() => {
    let ignore = false

    setWordbooksLoading(true)
    setWordbooksError(null)

    fetchWordbooks()
      .then((response) => {
        if (ignore) return
        setWordbooks(response.data)
        if (response.data.length > 0) {
          setSelectedWordbookId(response.data[0].id)
        }
      })
      .catch(() => {
        if (ignore) return
        setWordbooksError('単語帳一覧の取得に失敗しました。')
      })
      .finally(() => {
        if (ignore) return
        setWordbooksLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (selectedWordbookId === null || submitting) return

    setSubmitting(true)
    setSubmitError(null)

    fetchTest(selectedWordbookId, mode, mode === 'random' ? questionCount : undefined)
      .then((response) => {
        if (response.data.words.length === 0) {
          setSubmitError('選択した単語帳に出題できる単語がありません。')
          return
        }

        setTestWordbook(response.data.wordbook)
        setWords(response.data.words)
        setCurrentIndex(0)
        setShowAnswer(false)
        setUnderstoodCount(0)
        setNotUnderstoodCount(0)
        setPhase('quiz')
      })
      .catch(() => {
        setSubmitError('テストの開始に失敗しました。')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handleJudge = (understood: boolean) => {
    if (understood) {
      setUnderstoodCount((prev) => prev + 1)
    } else {
      setNotUnderstoodCount((prev) => prev + 1)
    }

    if (currentIndex + 1 >= words.length) {
      setPhase('result')
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setShowAnswer(false)
  }

  const handleRestart = () => {
    setPhase('form')
    setSubmitError(null)
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 border-b-4 border-green-500 pb-2 text-3xl font-bold text-gray-900">単語テスト</h1>

        {phase === 'form' && (
          <>
            {wordbooksLoading && <p className="text-gray-500">読み込み中...</p>}

            {!wordbooksLoading && wordbooksError && (
              <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {wordbooksError}
              </p>
            )}

            {!wordbooksLoading && !wordbooksError && (
              <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm">
                <div>
                  <label htmlFor="wordbook_id" className="mb-1 block text-sm font-medium text-gray-700">
                    単語帳を選択
                  </label>
                  <select
                    id="wordbook_id"
                    value={selectedWordbookId ?? ''}
                    onChange={(event) => setSelectedWordbookId(Number(event.target.value))}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                  >
                    {wordbooks.map((wordbook) => (
                      <option key={wordbook.id} value={wordbook.id}>
                        {wordbook.name}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className="mb-1 block text-sm font-medium text-gray-700">出題モード</legend>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="mode"
                        value="random"
                        checked={mode === 'random'}
                        onChange={() => setMode('random')}
                      />
                      ランダム
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="radio"
                        name="mode"
                        value="sequential"
                        checked={mode === 'sequential'}
                        onChange={() => setMode('sequential')}
                      />
                      順番
                    </label>
                  </div>
                </fieldset>

                {mode === 'random' && (
                  <div>
                    <label htmlFor="count" className="mb-1 block text-sm font-medium text-gray-700">
                      出題数
                    </label>
                    <input
                      id="count"
                      type="number"
                      min={1}
                      required
                      value={questionCount}
                      onChange={(event) => setQuestionCount(Number(event.target.value))}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                    />
                  </div>
                )}

                {submitError && (
                  <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting || selectedWordbookId === null}
                  className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {submitting ? '開始中...' : 'テスト開始！'}
                </button>
              </form>
            )}
          </>
        )}

        {phase === 'quiz' && words.length > 0 && (
          <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
            {testWordbook && <p className="mb-4 text-sm text-gray-500">単語帳: {testWordbook.name}</p>}
            <p className="mb-2 text-sm text-gray-500">
              {currentIndex + 1} / {words.length}問
            </p>

            <div className="rounded-lg border border-gray-200 bg-green-50 px-6 py-10 text-center">
              <p className="text-3xl font-bold text-gray-900">{words[currentIndex].english}</p>

              {!showAnswer && (
                <button
                  type="button"
                  onClick={() => setShowAnswer(true)}
                  className="mt-6 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  答えを見る
                </button>
              )}

              {showAnswer && (
                <>
                  <p className="mt-6 text-xl text-gray-700">{words[currentIndex].japanese}</p>
                  <div className="mt-6 flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleJudge(true)}
                      className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      理解した
                    </button>
                    <button
                      type="button"
                      onClick={() => handleJudge(false)}
                      className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                    >
                      理解していない
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">理解度結果</h2>
            {testWordbook && <p className="mb-4 text-sm text-gray-500">単語帳: {testWordbook.name}</p>}

            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">理解した単語数</th>
                  <td className="px-4 py-3 text-gray-900">{understoodCount}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">理解していない単語数</th>
                  <td className="px-4 py-3 text-gray-900">{notUnderstoodCount}</td>
                </tr>
              </tbody>
            </table>

            <button
              type="button"
              onClick={handleRestart}
              className="mt-6 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              もう一度テストする
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Test
