import type { PartOfSpeech, Word } from '../types/word'
import { adminFetch } from './httpClient'

export interface CreateAdminWordPayload {
  english: string
  japanese: string
  part_of_speech: PartOfSpeech
  wordbook_id: number
  order: number
}

export interface UpdateAdminWordPayload {
  english: string
  japanese: string
  part_of_speech: PartOfSpeech
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

export async function fetchAdminWord(id: number): Promise<Word> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await adminFetch(`${baseUrl}/admin/words/${id}`)

  if (!res.ok) {
    throw new Error('単語の取得に失敗しました。')
  }

  const json = (await res.json()) as { data: Word }
  return json.data
}

export async function updateAdminWord(id: number, payload: UpdateAdminWordPayload): Promise<void> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await adminFetch(`${baseUrl}/admin/words/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error('単語の更新に失敗しました。')
  }
}
