import type { WordbookListResponse } from '../types/wordbook'

export async function fetchWordbooks(): Promise<WordbookListResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await fetch(`${baseUrl}/wordbooks`)

  if (!res.ok) {
    throw new Error('単語帳一覧の取得に失敗しました。')
  }

  return res.json() as Promise<WordbookListResponse>
}
