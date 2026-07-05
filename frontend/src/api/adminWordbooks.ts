import type { CreateWordbookPayload, WordbookListResponse } from '../types/wordbook'
import { adminFetch } from './httpClient'

export async function fetchAdminWordbooks(): Promise<WordbookListResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await adminFetch(`${baseUrl}/admin/wordbooks`)

  if (!res.ok) {
    throw new Error('単語帳一覧の取得に失敗しました。')
  }

  return res.json() as Promise<WordbookListResponse>
}

export async function createAdminWordbook(payload: CreateWordbookPayload): Promise<void> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await adminFetch(`${baseUrl}/admin/wordbooks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error('単語帳の登録に失敗しました。')
  }
}
