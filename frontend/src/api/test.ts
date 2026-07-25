import type { TestMode, TestResponse } from '../types/test'

export async function fetchTest(wordbookId: number, mode: TestMode, count?: number): Promise<TestResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const params = new URLSearchParams({
    wordbook_id: String(wordbookId),
    mode,
  })
  if (count !== undefined) {
    params.set('count', String(count))
  }
  const res = await fetch(`${baseUrl}/test?${params.toString()}`)

  if (!res.ok) {
    throw new Error('テストの開始に失敗しました。')
  }

  return res.json() as Promise<TestResponse>
}
