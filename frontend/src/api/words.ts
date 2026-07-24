import type { PartOfSpeech, WordListResponse } from '../types/word'

export async function fetchWords(
  page: number,
  partOfSpeech?: PartOfSpeech,
  wordbookId?: number,
  keyword?: string,
  perPage?: number,
): Promise<WordListResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const params = new URLSearchParams({ page: String(page) })
  if (partOfSpeech) params.set('part_of_speech', partOfSpeech)
  if (wordbookId) params.set('wordbook_id', String(wordbookId))
  if (keyword) params.set('keyword', keyword)
  if (perPage) params.set('per_page', String(perPage))

  const res = await fetch(`${baseUrl}/words?${params.toString()}`)

  if (!res.ok) {
    throw new Error('単語一覧の取得に失敗しました。')
  }

  return res.json() as Promise<WordListResponse>
}
