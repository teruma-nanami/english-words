import type { PartOfSpeech, WordListResponse } from '../types/word'
import { adminFetch } from './httpClient'

export interface CreateAdminWordPayload {
  english: string
  japanese: string
  part_of_speech: PartOfSpeech
  wordbook_id: number
  order: number
}

export async function fetchAdminWords(page: number): Promise<WordListResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await adminFetch(`${baseUrl}/admin/words?page=${page}`)

  if (!res.ok) {
    throw new Error('単語一覧の取得に失敗しました。')
  }

  return res.json() as Promise<WordListResponse>
}

export async function createAdminWord(payload: CreateAdminWordPayload): Promise<void> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await adminFetch(`${baseUrl}/admin/words`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error('単語の登録に失敗しました。')
  }
}

export async function deleteAdminWord(id: number): Promise<void> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await adminFetch(`${baseUrl}/admin/words/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('単語の削除に失敗しました。')
  }
}
