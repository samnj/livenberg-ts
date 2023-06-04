export type TBook = {
  id: number
  title: string
  authors: {
    name: string
  }[]
  languages: string[]
  formats: {
    "image/jpeg": string
  }
}

export type TBooksResult = {
  count: number
  query: string
  next: string | null
  previous: string | null
  results: TBook[]
}
