export interface Repo {
  id: number
  name: string
  description: string | null
  language: string | null
  updatedAt: string
  stars: number
  url: string
  homepage: string | null
  topics: string[]
}

export interface ContactInput {
  name: string
  email: string
  message: string
  website?: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  replied: boolean
  created_at: string
}
