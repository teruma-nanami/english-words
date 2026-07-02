import type { WordListResponse } from '../types/word'

export async function fetchWords(page: number): Promise<WordListResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await fetch(`${baseUrl}/words?page=${page}`)

  if (!res.ok) {
    throw new Error('単語一覧の取得に失敗しました。')
  }

  return res.json() as Promise<WordListResponse>
}
