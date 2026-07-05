export interface Word {
  id: number
  english: string
  japanese: string
  part_of_speech: PartOfSpeech
}

export type PartOfSpeech = '名詞' | '動詞' | '形容詞' | '副詞' | '前置詞'

export const PART_OF_SPEECH_LABELS: Record<PartOfSpeech, string> = {
  名詞: '名',
  動詞: '動',
  形容詞: '形',
  副詞: '副',
  前置詞: '前',
}

export const PART_OF_SPEECH_BADGE_STYLES: Record<PartOfSpeech, string> = {
  名詞: 'bg-blue-100 text-blue-700',
  動詞: 'bg-green-100 text-green-700',
  形容詞: 'bg-purple-100 text-purple-700',
  副詞: 'bg-amber-100 text-amber-700',
  前置詞: 'bg-pink-100 text-pink-700',
}

export interface PaginationLinks {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface WordListResponse {
  data: Word[]
  links: PaginationLinks
  meta: PaginationMeta
}
