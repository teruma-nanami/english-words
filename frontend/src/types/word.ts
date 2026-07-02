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
