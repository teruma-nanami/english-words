export interface Wordbook {
  id: number
  name: string
}

export interface WordbookListResponse {
  data: Wordbook[]
}

export interface CreateWordbookPayload {
  name: string
}

export interface UpdateWordbookPayload {
  name: string
}
