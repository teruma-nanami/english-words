import { useEffect, useState } from 'react'
import { fetchWords } from '../api/words'
import { PART_OF_SPEECH_LABELS, type PaginationMeta, type Word } from '../types/word'

function WordList() {
  const [words, setWords] = useState<Word[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    setLoading(true)
    setError(null)

    fetchWords(currentPage)
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

  if (loading) {
    return <p>読み込み中...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  return (
    <div>
      <h1>単語一覧</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>英単語</th>
            <th>日本語</th>
            <th>品詞</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id}>
              <td>{word.id}</td>
              <td>{word.english}</td>
              <td>{word.japanese}</td>
              <td>{PART_OF_SPEECH_LABELS[word.part_of_speech]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {meta && (
        <div>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={meta.current_page <= 1}
          >
            前へ
          </button>
          <span>
            {meta.current_page} / {meta.last_page}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={meta.current_page >= meta.last_page}
          >
            次へ
          </button>
        </div>
      )}
    </div>
  )
}

export default WordList
