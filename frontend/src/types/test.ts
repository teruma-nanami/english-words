import type { Word } from './word'
import type { Wordbook } from './wordbook'

export type TestMode = 'random' | 'sequential'

export interface TestResponse {
  data: {
    wordbook: Wordbook
    words: Word[]
  }
}
