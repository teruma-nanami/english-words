import type { WordListResponse } from '../types/word'

export async function fetchAdminWords(page: number): Promise<WordListResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await fetch(`${baseUrl}/admin/words?page=${page}`)

  if (!res.ok) {
    throw new Error('単語一覧の取得に失敗しました。')
  }

  return res.json() as Promise<WordListResponse>
}

export async function deleteAdminWord(id: number): Promise<void> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await fetch(`${baseUrl}/admin/words/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('単語の削除に失敗しました。')
  }
}
