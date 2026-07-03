import type { Word } from './word'
import type { Wordbook } from './wordbook'

export interface TestResponse {
  data: {
    wordbook: Wordbook
    words: Word[]
  }
}
